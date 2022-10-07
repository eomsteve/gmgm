package com.lemonmul.gamulgamul.api.dto.detail;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PriceDto {
    private double price;

    public PriceDto(ProductPrice price) {
        this.price=price.getUnitPrice();
    }

    public PriceDto(GoodsPrice price) {
        this.price=price.getUnitPrice();
    }

    public PriceDto(FavoriteTotalPrice price) {
        this.price=price.getTotalPrice();
    }
}
