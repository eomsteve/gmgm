package com.lemonmul.gamulgamul.api.dto.product;

import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PriceDto {
    private double price;
    private LocalDate researchDate;

    public PriceDto(ProductPrice productPrice) {
        price=productPrice.getPrice();
        researchDate=productPrice.getResearchDate();
    }

    public PriceDto(GoodsPrice goodsPrice) {
        price=goodsPrice.getPrice();
        researchDate=goodsPrice.getResearchDate();
    }
}
