package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.news.ItemDto;
import com.lemonmul.gamulgamul.api.dto.news.SearchResultDto;
import com.lemonmul.gamulgamul.entity.News;
import com.lemonmul.gamulgamul.repo.NewsRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@SpringBootTest
@AutoConfigureWebMvc
@Rollback
public class MainServiceTest {

    @Autowired
    MainService mainService;

    @Autowired
    NewsRepo newsRepo;

    @Test
    public void 데이터저장(){
//        List<News> news = mainService.apiProcess();
        System.out.println("========== time parsing 시작 ==========");
//        System.out.printf(news.get(0).getPubDate().toString());
        mainService.apiProcess();
        List<News> news = newsRepo.findAll();
        System.out.println(news);
        System.out.println("========== time parsing 종료 ==========");
    }

    @Test
    public void 네이버에이피아이(){

        SearchResultDto apiResult = mainService.getNews();
        List<ItemDto> items = apiResult.getItems();

        System.out.println("===================API TEST 시작===================");
//        System.out.println(apiResult);
//        System.out.println(body);
        System.out.println(items);
//        for (int i = 0; i < 10; i++){
//            System.out.println(items.get(i).getTitle());
//        }
        System.out.println("===================API TEST 종료===================");

    }

    @Test
    public void 뉴스조회(){
        System.out.println("=============뉴스 Test 시작=============");
        List<News> randomNews = mainService.getNewsList();
        for (News news : randomNews){
            System.out.println(news.getTitle());
        }
        System.out.println("=============뉴스 Test 종료=============");
    }

    @Test
    public void removeHTMLtag(){
        String title="[코인시황] 비트코인 8월 PCE <b>물가</b> 상승에도 1만9000달러 유지\n" +
                "한총리 &quot;홍익인간 정신으로 새시대&quot;…&apos;연대·재도약·상생&apos; 강조";
        System.out.println(title.replaceAll("<.*?>", "").replaceAll("&.*?;",""));
    }

    @Test
    public void dateTimeFormatter(){
        System.out.println(LocalDateTime.of(2022,12,25,10,20)
                .format(DateTimeFormatter.ofPattern("yyyy년 M월 d일 기준")));
        System.out.println(LocalDateTime.of(2022,12,5,10,7)
                .format(DateTimeFormatter.ofPattern("yyyy년 M월 d일 h시 m분")));

    }
}
