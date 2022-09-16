package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteTotalPriceResponseDto {
    private Double totalPrice;

    private LocalDate researchDate;

    public FavoriteTotalPriceResponseDto(FavoriteTotalPrice favoriteTotalPrice) {
        this.totalPrice = favoriteTotalPrice.getTotalPrice();
        this.researchDate = favoriteTotalPrice.getResearchDate();
    }
}
