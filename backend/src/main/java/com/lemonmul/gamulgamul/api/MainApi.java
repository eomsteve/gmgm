package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.MainPageResponseDto;
import com.lemonmul.gamulgamul.api.dto.PriceIndexDto;
import com.lemonmul.gamulgamul.api.dto.checklist.ListDto;
import com.lemonmul.gamulgamul.entity.News;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.NewsRepo;
import com.lemonmul.gamulgamul.security.jwt.JwtProperties;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.MainService;
import com.lemonmul.gamulgamul.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
@Slf4j
public class MainApi {

    private final UserService userService;
    private final MainService mainService;

    /**
     * 메인페이지 정보 조회
     */
    @GetMapping()
    public MainPageResponseDto getMainPage(@RequestHeader HttpHeaders headers) {
        log.info("[Starting request]");

        //todo 있으면 있는걸로 없으면 없는걸로
        User user=User.empty();
        PriceIndexDto countryIndex = new PriceIndexDto(mainService.getIndex(IndexType.c));
        PriceIndexDto gmgmIndex = new PriceIndexDto(mainService.getIndex(IndexType.g));
//        PriceIndexDto favoriteIndex = null;
        List<ListDto> checklists = null;
        List<News> news = mainService.getNewsList();


        if (!headers.containsKey(JwtProperties.HEADER_STRING)){
            log.info("user is not logged in");
            PriceIndexDto favoriteIndex = new PriceIndexDto(mainService.getFavoriteIndex(user, IndexType.f));
            log.info("[Finished request]");
            return new MainPageResponseDto(user.getName(), gmgmIndex, countryIndex, favoriteIndex, new ArrayList<>(), news);
        }
        else{
            User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
            log.info("user {} has made a request", user.getId());
            PriceIndex userFavoriteIndex = mainService.getFavoriteIndex(user, IndexType.f);
            if (userFavoriteIndex != null) {
                favoriteIndex = new PriceIndexDto(userFavoriteIndex);
            }
            List<Checklist> userChecklists = mainService.getRecentChecklists(user);
            if (!userChecklists.isEmpty()){
                checklists = userChecklists.stream().map(ListDto::new).collect(Collectors.toList());
            }
            log.info("[Finished request]");
            return new MainPageResponseDto(user.getName(), gmgmIndex, countryIndex, favoriteIndex, checklists, news);
        }

    }
}