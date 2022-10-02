package com.lemonmul.gamulgamul.api.dto.main;

import com.lemonmul.gamulgamul.api.dto.checklist.ListInfoDto;
import com.lemonmul.gamulgamul.entity.News;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MainPageResponseDto {
    private String username;

    private String email;

    private PriceIndexDto gmgmIndex;

    private PriceIndexDto cpi;

    private PriceIndexDto favoriteIndex;

    private List<ListInfoDto> checklistList;

    private List<News> newsList;

}
