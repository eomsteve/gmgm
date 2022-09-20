package com.lemonmul.gamulgamul.api.dto.product;

import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
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

    private List<PriceDto> productPrices;
    private List<GoodsDto> goods;

    public ProductDto(Product product, List<ProductPrice> prices,List<GoodsDto> goodsDtos) {
        productName=product.getName();
        unit= product.getUnit();
        measure=product.getMeasure();
        productPrices=prices.stream().map(PriceDto::new).collect(Collectors.toList());
        goods=goodsDtos;
    }
}
