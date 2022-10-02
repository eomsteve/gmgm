package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.main.MainPageResponseDto;
import com.lemonmul.gamulgamul.api.dto.main.PriceIndexDto;
import com.lemonmul.gamulgamul.api.dto.checklist.ListDto;
import com.lemonmul.gamulgamul.entity.News;
import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.jwt.JwtProperties;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.MainService;
import com.lemonmul.gamulgamul.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class MainApi {

    private final UserService userService;
    private final MainService mainService;

    /**
     * 메인페이지 정보 조회
     */
    @GetMapping()
    public MainPageResponseDto getMainPage(@RequestHeader HttpHeaders headers) {
        log.info("[Starting request] GET /main");

        PriceIndexDto countryIndex = new PriceIndexDto(mainService.getIndex(IndexType.c));
        PriceIndexDto gmgmIndex = new PriceIndexDto(mainService.getIndex(IndexType.g));
        String userName, email;
        PriceIndexDto favoriteIndex;
        List<ListDto> checklists;
        if (headers.containsKey(JwtProperties.HEADER_STRING)) {
            User user=JwtTokenProvider.getUserFromJwtToken(userService, headers);
            userName=user.getName();
            email=user.getEmail();
            favoriteIndex=new PriceIndexDto(mainService.getFavoriteIndex(user,IndexType.f));
            checklists = mainService.getRecentChecklists(user)
                    .stream().map(ListDto::new).collect(Collectors.toList());
            log.info("user {} has made a request", user.getId());
        }else{
            userName="";
            email="";
            favoriteIndex=new PriceIndexDto(PriceIndex.empty(IndexType.f));
            checklists=new ArrayList<>();
            log.info("user is not logged in");
        }
        List<News> news = mainService.getNewsList();
        log.info("[Finished request] GET /main");
        return new MainPageResponseDto(userName,email,gmgmIndex,countryIndex,favoriteIndex,checklists,news);
    }
}