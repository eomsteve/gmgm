package com.lemonmul.gamulgamul.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemonmul.gamulgamul.api.dto.CategoryDto;
import com.lemonmul.gamulgamul.api.dto.ParamDto;
import com.lemonmul.gamulgamul.api.dto.favorite.*;
import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
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
    private final GoodsPriceService goodsPriceService;
    private final ProductService productService;
    private final ProductPriceService productPriceService;

    /**
     * 즐겨찾기 페이지에 보여줄 정보들
     */
    @GetMapping
    public FavoritePageResponseDto getFavoritePage(@RequestHeader HttpHeaders headers) {
        log.info("[Starting request]");

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);

        log.info("userId: {}", user.getId());

        LocalDate today = LocalDate.now();

        // 국가 지수
        List<PriceIndexResponseDto> countryIndices = priceIndexService.getIndices(IndexType.c, today).stream().map(PriceIndexResponseDto::new).collect(Collectors.toList());

        // 즐겨찾기 지수
        List<PriceIndexResponseDto> favoriteIndices = priceIndexService.getFavoriteIndices(user, today).stream().map(PriceIndexResponseDto::new).collect(Collectors.toList());

        // 업태 종류
        ArrayList<BusinessTypeResponseDto> businessTypesResponseDtos = new ArrayList<>();
        for(BusinessType businessType: BusinessType.values()) {
            businessTypesResponseDtos.add(new BusinessTypeResponseDto(businessType, businessType.getKrName()));
        }

        // 즐겨찾기 상품 목록
        List<FavoriteItemResponseDto> favoriteItemResponseDtos = getFavoriteGoods(user, BusinessType.m);

        // 즐겨찾기 상품 총합
        List<FavoriteTotalPrice> favoriteTotalPrices = favoriteTotalPriceService.getFavoriteTotalPrices(user, BusinessType.m, today);
        List<FavoriteTotalPriceResponseDto> favoriteTotalPriceResponseDtos = favoriteTotalPrices.stream().map(FavoriteTotalPriceResponseDto::new).collect(Collectors.toList());

        log.info("countryIndices size: {}", countryIndices.size());
        log.info("facoriteIndices size: {}", favoriteIndices.size());
        log.info("businessTypesResponseDtos size: [");
        for(BusinessTypeResponseDto response: businessTypesResponseDtos) {
            log.info("\t{}, {}", response.getBusinessType(), response.getKrName());
        }
        log.info("]");
        log.info("favoriteItemResponseDtos size: {}", favoriteItemResponseDtos.size());
        // TODO: log 점검
//        log.info("recent favoriteTotalPrice: {}", favoriteTotalPriceResponseDtos.get(favoriteTotalPriceResponseDtos.size() - 1).getTotalPrice());

        log.info("[Finished request]");
        return new FavoritePageResponseDto(countryIndices, favoriteIndices, businessTypesResponseDtos, favoriteItemResponseDtos, favoriteTotalPriceResponseDtos);
    }

    /**
     * 상품 선택 페이지에 띄울 카테고리와 품목들
     */
    // TODO: 리스트 개수 log
    @GetMapping("/select")
    public List<CategoryDto> getAllCategoryProducts() {
        log.info("[Starting request]");

        List<CategoryDto> categoryDtos = categoryService.getAllCategories().stream().map(CategoryDto::new).collect(Collectors.toList());

        log.info("categoryDtos size: {}", categoryDtos.size());

        log.info("[Finished request]");
        return categoryDtos;
    }

    /**
     * 품목 선택 시, 해당 품목의 상품들
     */
    // TODO: 품목 pk와 상품 리스트 개수 log
    @GetMapping("/select/product/{productId}")
    public List<GoodsDto> getGoods(@PathVariable Long productId) {
        log.info("[Starting request]");

        log.info("productId: {}", productId);

        Product product = productService.product(productId);
        List<GoodsDto> goodsDtos = product.getGoods().stream().map(GoodsDto::new).collect(Collectors.toList());

        log.info("goodsDtos size: {}", goodsDtos.size());

        log.info("[Finished request]");
        return goodsDtos;
    }

    /**
     * 즐겨찾기 목록 갱신
     */
    // TODO: return 값 수정(DTO)
    // TODO: 들어올 때 user pk랑 즐겨찾기 개수 log, 나갈 때 합산 및 지수 최신값 log
    @PostMapping
    public boolean updateFavoriteGoods(@RequestBody FavoriteUpdateRequestDto favoriteUpdateRequestDto, @RequestHeader HttpHeaders headers) throws JsonProcessingException {
        log.info("[Starting request]");

        List<Long> goodsIds = favoriteUpdateRequestDto.getGoodsIds();
        User user = JwtTokenProvider.getUserFromJwtToken(userService,headers);

        log.info("userId: {}", user.getId());
        log.info("favoriteUpdateRequestDtos: {}", favoriteUpdateRequestDto.getGoodsIds().size());

        // TODO: 쿼리가 너무 많이 나갈 것 같음...
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

        // 즐겨찾기 목록 갱신
        favoriteGoodsService.updateFavoriteGoodsList(addFavoriteGoodsList, deleteFavoriteGoodsList);

        // 즐겨찾기 총합, 지수 계산
        favoriteCalc(user);

        log.info("Finished request");
        return true;
    }

    @GetMapping("/business/{business}")
    public FavoriteBusinessSelectDto getFavoriteGoods(@PathVariable BusinessType business, @RequestHeader HttpHeaders headers) {
        log.info("[Starting request]");

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);

        log.info("userId: {}", user.getId());
        log.info("business: {}", business);

        List<FavoriteItemResponseDto> favoriteItemResponseDtos = getFavoriteGoods(user, business);
        List<FavoriteTotalPrice> favoriteTotalPrices = favoriteTotalPriceService.getFavoriteTotalPrices(user, business, LocalDate.now());
        List<FavoriteTotalPriceResponseDto> favoriteTotalPriceResponseDtos = favoriteTotalPrices.stream().map(FavoriteTotalPriceResponseDto::new).collect(Collectors.toList());

        FavoriteBusinessSelectDto favoriteBusinessSelectDtos = new FavoriteBusinessSelectDto(favoriteItemResponseDtos, favoriteTotalPriceResponseDtos);

        log.info("favoriteItemResponseDtos size: {}", favoriteItemResponseDtos.size());
//        log.info("recent favoriteTotalPrice: {}", favoriteTotalPriceResponseDtos.get(favoriteTotalPriceResponseDtos.size() - 1).getTotalPrice());

        log.info("Finished request");
        return favoriteBusinessSelectDtos;
    }

    // 즐겨찾기 총합과 지수 계산을 Spark에 요청하는 함수
    // TODO: 반환값 고민
    private boolean favoriteCalc(User user) throws JsonProcessingException {
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
        HttpEntity<String> response = restTemplate.postForEntity(url, requestMessage, String.class);
        log.info("POST Request Result: {}", response);

        return true;
    }

    private List<FavoriteItemResponseDto> getFavoriteGoods(User user, BusinessType businessType) {
        List<FavoriteGoods> favoriteGoodsList = user.getFavoriteGoods();
        List<FavoriteItemResponseDto> favoriteItemResponseDtos = new ArrayList<>();
        List<GoodsPrice> goodsPrices;
        // 최근 가격 변동 계산을 위해 가격 정보 중에서 가장 최근 가격 정보 둘의 차를 구함
        double priceGap=0.0;
        for (FavoriteGoods favoriteGoods : favoriteGoodsList) {
            goodsPrices = goodsPriceService.getRecentGoodsPrices(favoriteGoods.getGoods(), businessType);
            if(goodsPrices.size()>1)
                priceGap = goodsPrices.get(1).getPrice() - goodsPrices.get(0).getPrice();

            favoriteItemResponseDtos.add(new FavoriteItemResponseDto(favoriteGoods.getGoods(), priceGap));
        }

        return favoriteItemResponseDtos;
    }
}
