package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.api.dto.detail.DateDto;
import com.lemonmul.gamulgamul.api.dto.detail.PriceDto;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

// 지수 반환에 사용하는 Dto
@Data
@AllArgsConstructor
public class PriceIndexResponseDto {
    private List<ValueDto> values;
    private List<DateDto> researchDates;

    public PriceIndexResponseDto(List<PriceIndex> indices) {
        values=indices.stream().map(ValueDto::new).collect(Collectors.toList());
        researchDates=indices.stream().map(DateDto::new).collect(Collectors.toList());
    }
}
