package com.lemonmul.gamulgamul.api.dto.main;

import com.lemonmul.gamulgamul.entity.News;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@Slf4j
public class NewsDto {
    private Long id;
    private String title;
    private String link;
    private String pubDate;

    public NewsDto(News news) {
        title=news.getTitle();
        link=news.getLink();
        pubDate=news.getPubDate().plusHours(9).format(DateTimeFormatter.ofPattern("yyyy년 M월 d일 h시 m분"));
        log.debug("news dto pubDate: {}",pubDate);
    }
}
