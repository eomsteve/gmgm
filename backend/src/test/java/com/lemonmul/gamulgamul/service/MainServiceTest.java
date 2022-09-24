package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.news.ItemDto;
import com.lemonmul.gamulgamul.api.dto.news.SearchResultDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.List;


@SpringBootTest
@AutoConfigureWebMvc
public class MainServiceTest {

    @Autowired
    MainService mainService;

    @Test
    public void 데이터저장(){
        mainService.apiProcess();
    }

    @Test
    public void 네이버에이피아이(){

        SearchResultDto apiResult = mainService.getNews();
        List<ItemDto> items = apiResult.getItems();

        System.out.println("===================API TEST 시작===================");
//        System.out.println(apiResult);
//        System.out.println(body);
//        System.out.println(items);
        for (int i = 0; i < 10; i++){
            System.out.println(items.get(i).getTitle());
        }
        System.out.println("===================API TEST 종료===================");

    }
}
