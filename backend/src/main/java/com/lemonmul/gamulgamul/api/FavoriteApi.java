package com.lemonmul.gamulgamul.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemonmul.gamulgamul.api.dto.CategoryDto;
import com.lemonmul.gamulgamul.api.dto.zeppelin.ParamDto;
import com.lemonmul.gamulgamul.api.dto.zeppelin.RestResponseDto;
import com.lemonmul.gamulgamul.api.dto.favorite.*;
import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class FavoriteApi {

    private final UserService userService;
    private final FavoriteGoodsService favoriteGoodsService;
    private final FavoriteTotalPriceService favoriteTotalPriceService;
    private final PriceIndexService priceIndexService;
    private final CategoryService categoryService;
    private final GoodsService goodsService;
    private final ProductService productService;
    private final FavoriteRecommendService favoriteRecommendService;

    /**
     * 즐겨찾기 페이지에 보여줄 정보들
     */
    @GetMapping
    public FavoritePageResponseDto getFavoritePage(@RequestHeader HttpHeaders headers) {
        log.info("[Starting request] GET /favorite");

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        log.info("userId: {}", user.getId());

        LocalDate today = LocalDate.now();

        // 국가 지수
        List<PriceIndex> countryIndices = priceIndexService.getIndices(IndexType.c, today);
        PriceIndexResponseDto countryIndexDto = new PriceIndexResponseDto(countryIndices);
        log.info("countryIndices size: {}", countryIndices.size());

        // 즐겨찾기 지수
        List<PriceIndex> favoriteIndices = priceIndexService.getFavoriteIndices(user, today);
        PriceIndexResponseDto favoriteIndexDto = new PriceIndexResponseDto(favoriteIndices);
        log.info("favoriteIndices size: {}", favoriteIndices.size());

        // 즐겨찾기 상품 목록
        List<FavoriteItemResponseDto> favoriteItems = getFavoriteGoods(user);
        log.info("favoriteItems size: {}", favoriteItems.size());

        // 즐겨찾기 상품 추천
        List<Long> goodsIds = favoriteItems.stream().map(FavoriteItemResponseDto::getGoodsId).toList();
        List<FavoriteRecommendDto> favoriteRecommends = favoriteRecommendService.getFavoriteRecommends(user, goodsIds);
        log.info("favoriteRecommends size: {}", favoriteRecommends.size());

        // 즐겨찾기 상품 총합
        List<FavoriteTotalPrice> favoriteTotalPrices = favoriteTotalPriceService.getFavoriteTotalPrices(user, BusinessType.m, today);
        FavoriteTotalPriceResponseDto favoriteTotalPriceResponseDto = new FavoriteTotalPriceResponseDto(favoriteTotalPrices);
        if (favoriteTotalPrices.isEmpty())
            log.info("favoriteTotalPrices is empty");
        else
            log.info("recent favoriteTotalPrice: {}", favoriteTotalPrices.get(favoriteTotalPrices.size() - 1).getTotalPrice());

        log.info("[Finished request] GET /favorite");
        return new FavoritePageResponseDto(countryIndexDto, favoriteIndexDto, favoriteItems, favoriteRecommends, favoriteTotalPriceResponseDto);
    }

    /**
     * 상품 선택 페이지에 띄울 카테고리와 품목들
     */
    @GetMapping("/select")
    public List<CategoryDto> getAllCategoryProducts() {
        log.info("[Starting request] GET /select");

        List<CategoryDto> categoryDtos = categoryService.getAllCategories().stream().map(CategoryDto::new).collect(Collectors.toList());
        log.info("categoryDtos size: {}", categoryDtos.size());

        log.info("[Finished request] GET /select");
        return categoryDtos;
    }

    /**
     * 품목 선택 시, 해당 품목의 상품들
     */
    @GetMapping("/select/product/{productId}")
    public List<GoodsDto> getGoods(@PathVariable Long productId) {
        log.info("[Starting request] GET /favorite/select/product/{}", productId);

        log.info("productId: {}", productId);

        Product product = productService.product(productId);
        List<GoodsDto> goodsDtos = product.getGoods().stream().map(GoodsDto::new).collect(Collectors.toList());
        log.info("goodsDtos size: {}", goodsDtos.size());

        log.info("[Finished request] GET /favorite/select/product/{}", productId);
        return goodsDtos;
    }

    /**
     * 즐겨찾기 목록 갱신 v1
     */
    @PostMapping
    public List<FavoriteItemResponseDto> updateFavoriteGoods(@RequestBody FavoriteUpdateRequestDto favoriteUpdateRequestDto, @RequestHeader HttpHeaders headers) throws Exception {
        log.info("[Starting request] POST /favorite");

        List<Long> goodsIds = favoriteUpdateRequestDto.getGoodsIds();
        User user = JwtTokenProvider.getUserFromJwtToken(userService,headers);
        log.info("userId: {}", user.getId());
        log.info("favoriteUpdateRequestDtos: {}", favoriteUpdateRequestDto.getGoodsIds().size());

        // 즐겨찾기 목록에서 삭제할 항목들
        List<FavoriteGoods> deleteFavoriteGoodsList = user.getFavoriteGoods();
        // 즐겨찾기 목록에 추가할 항목들
        List<FavoriteGoods> addFavoriteGoodsList = new ArrayList<>();
        boolean[] exists = new boolean[goodsIds.size()];

        List<Goods> goodsList = goodsService.getGoodsList(goodsIds);

        FavoriteGoods favoriteGoods;
        // 일단 사용자의 즐겨찾기 목록을 전부 삭제할 목록에 넣어두고
        // 반복문을 돌면서 남겨둘 항목은 삭제할 목록에서 제거
        for(int i = deleteFavoriteGoodsList.size() - 1; i >= 0; i--) {
            favoriteGoods = deleteFavoriteGoodsList.get(i);

            for(int j = 0; j < goodsList.size(); j++) {
                if(favoriteGoods.getGoods().equals(goodsList.get(j))) {
                    deleteFavoriteGoodsList.remove(i);
                    // 입력으로 받은 것들 중에서 이미 존재하는 것에는 exist를 체크
                    exists[j] = true;
                    break;
                }
            }
        }

        // exist가 false인 항목들만 새로 추가
        for(int i = 0; i < exists.length; i++) {
            if(!exists[i])
                addFavoriteGoodsList.add(FavoriteGoods.of(user, goodsList.get(i)));
        }
        log.info("addFavoriteGoodsList size: {}", addFavoriteGoodsList.size());
        log.info("deleteFavoriteGoodsList size: {}", deleteFavoriteGoodsList.size());

        // 즐겨찾기 목록 갱신
        favoriteGoodsService.updateFavoriteGoodsList(addFavoriteGoodsList, deleteFavoriteGoodsList);
        List<FavoriteItemResponseDto> newFavoriteGoodsList = favoriteGoodsService.existFavoriteGoods(user).stream().map(FavoriteItemResponseDto::new).collect(Collectors.toList());
        log.info("newFavoriteGoodsList size: {}", newFavoriteGoodsList.size());

        // 즐겨찾기 총합, 지수 계산
        if(favoriteCalc(user)) {
            log.info("[Finished request] POST /favorite");
            return newFavoriteGoodsList;
        } else {
            throw new Exception();
        }
    }

    /**
     * 즐겨찾기 목록 갱신 v2
     */
    @PostMapping("/update")
    public List<FavoriteItemResponseDto> updateFavoriteGoods(@RequestBody FavoriteUpdateRequestDtoV2 favoriteUpdateRequestDto, @RequestHeader HttpHeaders headers) throws Exception {
        log.info("[Starting request] POST /favorite");

        List<Long> goodsIds = favoriteUpdateRequestDto.getInputGoodsList().stream().map(GoodsDto::getGoodsId).collect(Collectors.toList());
        User user = JwtTokenProvider.getUserFromJwtToken(userService,headers);
        log.info("userId: {}", user.getId());
        log.info("favoriteUpdateRequestDtos: {}", favoriteUpdateRequestDto.getInputGoodsList().size());

        // 즐겨찾기 목록에서 삭제할 항목들
        List<FavoriteGoods> deleteFavoriteGoodsList = user.getFavoriteGoods();
        // 즐겨찾기 목록에 추가할 항목들
        List<FavoriteGoods> addFavoriteGoodsList = new ArrayList<>();
        boolean[] exists = new boolean[goodsIds.size()];

        List<Goods> goodsList = goodsService.getGoodsList(goodsIds);

        FavoriteGoods favoriteGoods;
        // 일단 사용자의 즐겨찾기 목록을 전부 삭제할 목록에 넣어두고
        // 반복문을 돌면서 남겨둘 항목은 삭제할 목록에서 제거
        for(int i = deleteFavoriteGoodsList.size() - 1; i >= 0; i--) {
            favoriteGoods = deleteFavoriteGoodsList.get(i);

            for(int j = 0; j < goodsList.size(); j++) {
                if(favoriteGoods.getGoods().equals(goodsList.get(j))) {
                    deleteFavoriteGoodsList.remove(i);
                    // 입력으로 받은 것들 중에서 이미 존재하는 것에는 exist를 체크
                    exists[j] = true;
                    break;
                }
            }
        }

        // exist가 false인 항목들만 새로 추가
        for(int i = 0; i < exists.length; i++) {
            if(!exists[i])
                addFavoriteGoodsList.add(FavoriteGoods.of(user, goodsList.get(i)));
        }
        log.info("addFavoriteGoodsList size: {}", addFavoriteGoodsList.size());
        log.info("deleteFavoriteGoodsList size: {}", deleteFavoriteGoodsList.size());

        // 즐겨찾기 목록 갱신
        favoriteGoodsService.updateFavoriteGoodsList(addFavoriteGoodsList, deleteFavoriteGoodsList);
        List<FavoriteItemResponseDto> newFavoriteGoodsList = favoriteGoodsService.existFavoriteGoods(user).stream().map(FavoriteItemResponseDto::new).collect(Collectors.toList());
        log.info("newFavoriteGoodsList size: {}", newFavoriteGoodsList.size());

        // 즐겨찾기 총합, 지수 계산
        if(favoriteCalc(user)) {
            log.info("[Finished request] POST /favorite");
            return newFavoriteGoodsList;
        } else {
            throw new Exception();
        }
    }

    /**
     * 해당 상품을 사용자의 즐겨찾기 목록에 추가
     */
    @PostMapping("/goods/{goodsId}")
    public List<FavoriteItemResponseDto> addFavoriteGoods(@PathVariable Long goodsId, @RequestHeader HttpHeaders headers) throws Exception {
        log.info("[Starting request] POST /add/{goodsId}");

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        Goods goods = goodsService.getGoodsById(goodsId);
        log.info("userId: {}", user.getId());
        log.info("goodsId: {}", goodsId);

        if(favoriteGoodsService.existFavoriteGoods(user, goods))
            throw new IllegalArgumentException();

        favoriteGoodsService.addFavoriteGoods(user, goods);
        List<FavoriteItemResponseDto> newFavoriteGoodsList = favoriteGoodsService.existFavoriteGoods(user).stream().map(FavoriteItemResponseDto::new).collect(Collectors.toList());
        log.info("newFavoriteGoodsList size: {}", newFavoriteGoodsList.size());

        if(favoriteCalc(user)) {
            log.info("[Finished request] POST /add/{goodsId}");
            return newFavoriteGoodsList;
        } else {
            throw new Exception();
        }
    }

    /**
     * 해당 상품을 사용자의 즐겨찾기 목록에 추가 v2
     */
    @PostMapping("/goods/{goodsId}/v2")
    public FavoriteItemResponseDto addFavoriteGoodsV2(@PathVariable Long goodsId, @RequestHeader HttpHeaders headers) throws Exception {
        log.info("[Starting request] POST /add/{goodsId}");

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        Goods goods = goodsService.getGoodsById(goodsId);
        log.info("userId: {}", user.getId());
        log.info("goodsId: {}", goodsId);

        if(favoriteGoodsService.existFavoriteGoods(user, goods))
            throw new IllegalArgumentException();

        favoriteGoodsService.addFavoriteGoods(user, goods);
        List<FavoriteItemResponseDto> newFavoriteGoodsList = favoriteGoodsService.existFavoriteGoods(user).stream().map(FavoriteItemResponseDto::new).toList();
        log.info("newFavoriteGoodsList size: {}", newFavoriteGoodsList.size());

        if(favoriteCalc(user)) {
            log.info("[Finished request] POST /add/{goodsId}");
            return new FavoriteItemResponseDto(goods);
        } else {
            throw new Exception();
        }
    }

    /**
     * 즐겨찾기 총합과 지수 계산을 spark에 요청하는 함수
     */
    private boolean favoriteCalc(User user) throws JsonProcessingException {
        LocalDate today = LocalDate.now();

        // 기존 즐겨찾기 총합과 지수 백업
        List<FavoriteTotalPrice> originFavoriteTotalPrices = favoriteTotalPriceService.getAllFavoriteTotalPrices(user, today);
        List<PriceIndex> originFavoriteIndices = priceIndexService.getFavoriteIndices(user, today);

        // 기존 즐겨찾기 총합과 지수 삭제
        favoriteTotalPriceService.deleteFavoriteTotalPrice(user);
        priceIndexService.deleteFavoriteIndex(user);

        // API 요청에 사용하는 객체
        RestTemplate restTemplate = new RestTemplate();

        // JSON 생성에 사용하는 객체
        ObjectMapper ob = new ObjectMapper();

        // Zeppelin paragraph url
        String url = "http://3.36.106.26:8081/api/notebook/run/2HG47WXRQ/paragraph_1663754976707_2131716080";

        // 요청 header 설정
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // 요청에 사용할 JSON 생성
        SparkUpdateDto sparkUpdateDto = new SparkUpdateDto(new ParamDto(user.getId().toString()));
        String request = ob.writeValueAsString(sparkUpdateDto);

        log.info("JSON: {}", request);

        // 요청 메세지 설정
        HttpEntity<?> requestMessage = new HttpEntity<>(request, httpHeaders);

        // POST 요청 전송
        HttpEntity<RestResponseDto> response = restTemplate.postForEntity(url, requestMessage, RestResponseDto.class);
        String code = Objects.requireNonNull(response.getBody()).getBody().getCode();
        log.info("response code: {}", code);

        if(!code.equals("SUCCESS")) {
            favoriteTotalPriceService.addAll(originFavoriteTotalPrices);
            priceIndexService.addAll(originFavoriteIndices);
            return false;
        }

        return true;
    }

    /**
     * 즐겨찾기 목록을 받아오는 함수
     */
    private List<FavoriteItemResponseDto> getFavoriteGoods(User user) {
        List<FavoriteGoods> favoriteGoodsList = user.getFavoriteGoods();

        return favoriteGoodsList.stream().map(FavoriteItemResponseDto::new).collect(Collectors.toList());
    }
}
