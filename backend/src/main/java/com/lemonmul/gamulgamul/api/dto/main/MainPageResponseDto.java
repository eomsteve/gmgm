package com.lemonmul.gamulgamul.api.dto.main;

import com.lemonmul.gamulgamul.api.dto.checklist.ListDto;
import com.lemonmul.gamulgamul.entity.News;
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

    private List<ListDto> checklistList;

    private List<News> newsList;

}
