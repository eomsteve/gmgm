package com.lemonmul.gamulgamul.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class News {

    @Column(name = "news_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String link;

    private LocalDateTime pubDate;

    private News(String title, String link, LocalDateTime pubDate) {
        this.title = title;
        this.link = link;
        this.pubDate = pubDate;
    }

    public static News of(String title, String link, LocalDateTime pubDate){
        return new News(title,link,pubDate);
    }
}
