package com.lemonmul.gamulgamul.api.dto.detail;

import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDto {
    private String productName;
    private int unit;
    private String measure;
    private List<GoodsInfoDto> goodsInfo;
    private List<PriceDto> productPrices;

    public ProductDto(Product product, List<ProductPrice> prices) {
        productName=product.getName();
        unit= product.getUnit();
        measure=product.getMeasure();
        goodsInfo=product.getGoods().stream().map(GoodsInfoDto::new).collect(Collectors.toList());
        productPrices=prices.stream().map(PriceDto::new).collect(Collectors.toList());
    }
}
