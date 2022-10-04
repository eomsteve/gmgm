package com.lemonmul.gamulgamul.api.dto.main;

import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class PriceIndexDto {
    private double value;
    private String researchDate;

    public PriceIndexDto(PriceIndex index) {
        value=index.getValue();
        researchDate=index.getResearchDate().format(DateTimeFormatter.ofPattern("yyyy년 M월 기준"));
    }
}
