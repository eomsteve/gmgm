package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.detail.FavoriteDto;
import com.lemonmul.gamulgamul.api.dto.detail.GoodsDto;
import com.lemonmul.gamulgamul.api.dto.detail.ProductDto;
import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsLog;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.GoodsLogRepo;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detail")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class DetailApi {

    private final ProductService productService;
    private final ProductPriceService productPriceService;
    private final GoodsService goodsService;
    private final GoodsPriceService goodsPriceService;
    private final UserService userService;
    private final GoodsLogRepo goodsLogRepo;

    /**
     * 체크리스트 -> 품목 세부 페이지 진입
     *  해당 품목 정보, 품목의 상품 정보, 품목 가격 변동 정보
     */
    @GetMapping("/product/{productId}/business/{business}")
    public ProductDto productDetail(@PathVariable Long productId, @PathVariable BusinessType business){
        log.info("[Starting request] GET /detail/product/{}/business/{}",productId,business);
        log.info("[Finished request] GET /detail/product/{}/business/{}",productId,business);
        return getProductDto(productId, business);
    }

    /**
     * 세부 페이지에서 상품 선택
     *  해당 상품 정보, 상품 가격 변동 정보
     */
    @GetMapping("/goods/{goodsId}/business/{business}")
    public GoodsDto goodsDetail(@PathVariable Long goodsId, @PathVariable BusinessType business,
                                @RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /detail/goods/{}/business/{}",goodsId,business);
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        log.info("[Finished request] GET /detail/goods/{}/business/{}",goodsId,business);
        return getGoodsDto(goodsId, business,user);
    }

    /**
     * 즐겨찾기 -> 품목 세부 페이지 진입
     *  해당 품목 정보, 품목의 상품 정보, 품목 가격 변동 정보, 해당 상품 정보, 상품 가격 변동 정보
     */
    @GetMapping("/product/{productId}/goods/{goodsId}/business/{business}")
    public FavoriteDto productAndGoodsDetail(
            @PathVariable Long productId,@PathVariable Long goodsId,@PathVariable BusinessType business,
            @RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /detail/product/{}/goods/{}/business/{}",productId,goodsId,business);

        ProductDto productDto = getProductDto(productId,business);
        checkGoodsInProduct(goodsId, productDto);

        User user=JwtTokenProvider.getUserFromJwtToken(userService,headers);
        GoodsDto goodsDto = getGoodsDto(goodsId,business,user);

        log.info("[Finished request] GET /detail/product/{}/goods/{}/business/{}",productId,goodsId,business);
        return new FavoriteDto(productDto,goodsDto);
    }

    /**
     * ProductDto 생성
     */
    private ProductDto getProductDto(Long productId, BusinessType business) {
        Product product = productService.product(productId);
        List<ProductPrice> productPrices = productPriceService.productPricesFor1yearByBusiness(product, business);
        log.info("goods size: {}, productPrices size: {}",product.getGoods().size(),productPrices.size());
        return new ProductDto(product, productPrices);
    }

    /**
     * GoodsDto 생성
     */
    private GoodsDto getGoodsDto(Long goodsId, BusinessType business, User user) {
        Goods goods = goodsService.getGoodsById(goodsId);
        Double cheapPrice = goodsPriceService.goodsCheapPrice(goods).getPrice();
        List<GoodsPrice> goodsPrices = goodsPriceService.goodsPricesFor1yearByBusinessType(goods, business);
        log.info("goodsPrices size: {}",goodsPrices.size());

        //사용자의 상품 클릭 이력 저장
        goodsLogRepo.save(GoodsLog.of(user,goods));
        return new GoodsDto(goods, cheapPrice, goodsPrices);
    }

    /**
     * goodsId가 product 안에 있는지 확인
     */
    private void checkGoodsInProduct(Long goodsId, ProductDto productDto) {
        productDto.getGoodsInfos().stream()
                .filter(g->goodsId.equals(g.getGoodsId())).findAny()
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 품목에 포함되어있지 않습니다."));
    }
}
