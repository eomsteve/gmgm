package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.news.ItemDto;
import com.lemonmul.gamulgamul.api.dto.news.SearchResultDto;
import com.lemonmul.gamulgamul.entity.News;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.ChecklistRepo;
import com.lemonmul.gamulgamul.repo.NewsRepo;
import com.lemonmul.gamulgamul.repo.PriceIndexRepo;
import com.lemonmul.gamulgamul.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.beans.Transient;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final PriceIndexRepo priceIndexRepo;
    private final ChecklistRepo checklistRepo;

    private final NewsRepo newsRepo;

    /**
     * 국가, 가물가물 최신 index 조회
     * */
    public PriceIndex getIndex(IndexType indexType){
        return priceIndexRepo.findTopByIndexTypeOrderByResearchDateDesc(indexType);
    }

    /**
     * 즐겨찾기 지수 최신 index 조회
     */
    public PriceIndex getFavoriteIndex(User user, IndexType indexType){
        return priceIndexRepo.findTopByUserAndIndexTypeOrderByResearchDateDesc(user, indexType);
    }

    /**
     * 최신 Checklist 조회
     * 해당 유저의 체크리스트 최대 3개를 반환
     * */
    public List<Checklist> getRecentChecklists(User user){
        List<Checklist> checklists = checklistRepo.findByUserAndIsDeletedOrderByRegDateDescIdDesc(user, false);
        if (checklists.size() > 3)
            return checklists.subList(checklists.size() - 3, checklists.size() - 1);
        else
            return checklists;
    }

    /**
     * 물가 관련 뉴스 조회
     * */



    /**
     * 물가 관련 뉴스 API 요청 및 DB 저장
     * TODO: Cron도 ..해야지..ㅎ...
     * */
    public void apiProcess(){
//    public List<News> apiProcess(){
        // 요청한 api 내용 받아 오는 함수 호출
        SearchResultDto newsApi = getNews();

        // TODO: db에 기존에 있던 기사 삭제하고 저장하는 함수 호출
        saveNews(newsApi.getItems());

//        return news;

    }

    /**
    * API 요청 결과 body를 반환해 주는 함수
    * ? private으로 바꿔야 하지 않을까?
    * */
    public SearchResultDto getNews(){
        String clientId = "8dsQLQwo_ame0XieXqz0";
        String clientSecret = "09sRAUGzaj";

        RestTemplate restTemplate = new RestTemplate();

        // 네이버 API 요청 시 headr에 넣어야 하는 정보 추가
        HttpHeaders header = new HttpHeaders();
        header.add("X-Naver-Client-Id", clientId);
        header.add("X-Naver-Client-Secret", clientSecret);
        HttpEntity<?> entity = new HttpEntity<>(header);

        // URI 빌드
        String keyword = "물가";
        Integer size = 20;
        UriComponents uri = UriComponentsBuilder.newInstance()
                .scheme("https").host("openapi.naver.com").path(("/v1/search/news.json"))
                .query("query={keyword}").query("display={size}")
                .buildAndExpand(keyword, size);

        // 요청 받기
        ResponseEntity<SearchResultDto> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, SearchResultDto.class);

        return resultMap.getBody();

    }

    /**
     * DB 저장 함수
     * */
    @Transactional
    public void saveNews(List<ItemDto> items){
//    public List<News> saveNews(List<ItemDto> items){
        // TODO: Dto 에 있는 정보 뽑아서 entity 생성해서 넣어주기
        // List 만들어서 entity 때려 담은 후에 save all
        List<News> newsList = new ArrayList<>();

        ItemDto itemDto;

        for (ItemDto item : items) {
            itemDto = item;
            String dateStr = itemDto.getPubDate();
//            System.out.printf(dateStr);

            // Mon, 26 Sep 2022 14:48:00 +0900

            LocalDateTime dateTime = LocalDateTime.parse(dateStr, DateTimeFormatter.RFC_1123_DATE_TIME);
            newsList.add(News.of(itemDto.getTitle(), itemDto.getLink(), dateTime));
        }


//        return newsList;
        newsRepo.saveAll(newsList);


    }

}
