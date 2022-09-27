package com.lemonmul.gamulgamul.api.dto.detail;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DateDto {

    private LocalDate researchDate;

    public DateDto(ProductPrice price) {
        researchDate=price.getResearchDate();
    }

    public DateDto(GoodsPrice price) {
        researchDate=price.getResearchDate();
    }

    public DateDto(PriceIndex index) {
        researchDate=index.getResearchDate();
    }

    public DateDto(FavoriteTotalPrice price) {
        researchDate=price.getResearchDate();
    }
}
