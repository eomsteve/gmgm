package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

// 지수 반환에 사용하는 Dto
@Data
@AllArgsConstructor
public class PriceIndexResponseDto {
    private LocalDate researchDate;

    private Double value;

    public PriceIndexResponseDto(PriceIndex priceIndex) {
        this.researchDate = priceIndex.getResearchDate();
        this.value = priceIndex.getValue();
    }
}
