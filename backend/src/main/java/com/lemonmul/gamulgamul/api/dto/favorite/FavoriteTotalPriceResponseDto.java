package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.api.dto.detail.DateDto;
import com.lemonmul.gamulgamul.api.dto.detail.PriceDto;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteTotalPriceResponseDto {
    private List<PriceDto> totalPrices;
    private List<DateDto> researchDates;

    public FavoriteTotalPriceResponseDto(List<FavoriteTotalPrice> favoriteTotalPrices) {
        totalPrices = favoriteTotalPrices.stream().map(PriceDto::new).collect(Collectors.toList());
        researchDates = favoriteTotalPrices.stream().map(DateDto::new).collect(Collectors.toList());
    }
}
