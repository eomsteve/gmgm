package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.detail.GoodsDto;
import com.lemonmul.gamulgamul.api.dto.detail.ProductDto;
import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.service.GoodsPriceService;
import com.lemonmul.gamulgamul.service.GoodsService;
import com.lemonmul.gamulgamul.service.ProductPriceService;
import com.lemonmul.gamulgamul.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detail")
@RequiredArgsConstructor
@CrossOrigin("*")
@Slf4j
public class DetailApi {

    private final ProductService productService;
    private final ProductPriceService productPriceService;
    private final GoodsService goodsService;
    private final GoodsPriceService goodsPriceService;

    /**
     * 품목 세부 페이지 진입
     *  해당 품목 정보, 품목의 상품 정보, 품목 가격 변동 정보
     */
    @GetMapping("/product/{productId}/business/{business}")
    public ProductDto productDetail(@PathVariable Long productId, @PathVariable BusinessType business){
        Product product = productService.product(productId);
        List<ProductPrice> productPrices = productPriceService.productPricesByBusiness(product, business);
        return new ProductDto(product, productPrices);
    }

    /**
     * 세부 페이지에서 상품 선택
     *  해당 상품 정보
     */
    @GetMapping("/goods/{goodsId}/business/{business}")
    public GoodsDto goodsDetail(@PathVariable Long goodsId, @PathVariable BusinessType business){
        Goods goods = goodsService.getGoodsById(goodsId);
        Double cheapPrice = goodsPriceService.goodsCheapPrice(goods).getPrice();
        List<GoodsPrice> goodsPrices = goodsPriceService.goodsPricesByBusinessType(goods, business);
        return new GoodsDto(goods,cheapPrice,goodsPrices);
    }
}
