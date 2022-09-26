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
        System.out.printf("========== time parsing 시작 ==========");
//        System.out.printf(news.get(0).getPubDate().toString());
        mainService.apiProcess();
        List<News> news = newsRepo.findAll();
        System.out.println(news);
        System.out.printf("========== time parsing 종료 ==========");
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
}
