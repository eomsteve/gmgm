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

    private PriceIndexDto gmgmIndex;

    private PriceIndexDto cpi;

    private PriceIndexDto favoriteIndex;

    private List<ChecklistListDto> checklistList;

    // TODO: 추후에 news dto로 만들기
    private String news;

}
