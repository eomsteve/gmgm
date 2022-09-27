package com.lemonmul.gamulgamul.api.dto;

import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PriceIndexDto {
    private double value;
    private LocalDate researchDate;

    public PriceIndexDto(PriceIndex index) {
        value=index.getValue();
        researchDate=index.getResearchDate();
    }
}
