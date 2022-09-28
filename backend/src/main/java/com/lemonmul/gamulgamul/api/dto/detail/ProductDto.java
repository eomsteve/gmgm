package com.lemonmul.gamulgamul.api.dto.detail;

import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDto {
    private String basicProductName;
    private int unit;
    private String measure;
    private List<GoodsInfoDto> goodsInfos;
    private List<PriceDto> productPrices;
    private List<DateDto> researchDates;

    public ProductDto(Product product, List<ProductPrice> prices) {
        basicProductName =product.getName();
        unit= product.getUnit();
        measure=product.getMeasure();
        goodsInfos =product.getGoods().stream().map(GoodsInfoDto::new).collect(Collectors.toList());
        productPrices=prices.stream().map(PriceDto::new).collect(Collectors.toList());
        researchDates=prices.stream().map(DateDto::new).collect(Collectors.toList());
    }
}
