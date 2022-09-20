package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.product.GoodsDto;
import com.lemonmul.gamulgamul.api.dto.product.ProductDto;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@Slf4j
public class ProductApi {

    private final ProductService productService;
    private final ProductPriceService productPriceService;
    private final GoodsPriceService goodsPriceService;

    @GetMapping("/{productId}/business/{businessType}")
    public ProductDto productDetail(@PathVariable Long productId, @PathVariable BusinessType businessType){
        Product product = productService.product(productId);
        List<ProductPrice> productPrices = productPriceService.productPricesByBusinessType(product, businessType);

        List<GoodsDto> goodsDtos=new ArrayList<>();
        for (Goods goods : product.getGoods()) {
            //todo 상품 가격을 지금처럼 따로 들고올지, 한번에 들고와서 처리할지 고민해보기
            //in절로 한번에 들고오는거 정도는 할 수 있을지도..?
            Double cheapPrice = goodsPriceService.goodsCheapPrice(goods).getPrice();
            List<GoodsPrice> goodsPrices = goodsPriceService.goodsPricesByBusinessType(goods, businessType);
            goodsDtos.add(new GoodsDto(goods,cheapPrice,goodsPrices));
        }

        return new ProductDto(product, productPrices, goodsDtos);
    }
}
