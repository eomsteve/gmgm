package com.lemonmul.gamulgamul.api.dto.news;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private String title;
    private String originallink;
    private String link;
    private String description;
    private String pubDate;
}
