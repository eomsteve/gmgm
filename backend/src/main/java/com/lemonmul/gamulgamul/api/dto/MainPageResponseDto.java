package com.lemonmul.gamulgamul.api.dto;

import com.lemonmul.gamulgamul.api.dto.checklist.ChecklistListDto;
import com.lemonmul.gamulgamul.api.dto.favorite.PriceIndexResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MainPageResponseDto {
    private String username;

    private PriceIndexResponseDto GMGMIndex;

    private PriceIndexResponseDto cpi;

    private PriceIndexResponseDto favoriteIndex;

    private List<ChecklistListDto> checklistListDto;

    // TODO: 추후에 news dto로 만들기
    private String news;

}
