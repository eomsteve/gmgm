package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.favorite.*;
import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.Category;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
@Slf4j
public class FavoriteApi {

    private final UserService userService;
    private final FavoriteGoodsService favoriteGoodsService;
    private final FavoriteTotalPriceService favoriteTotalPriceService;
    private final PriceIndexService priceIndexService;
    private final CategoryService categoryService;
    private final GoodsService goodsService;
    private final GoodsPriceService goodsPriceService;

    /**
     * 즐겨찾기 페이지에 보여줄 정보들
     */
    // TODO: 들어올 때 user pk, 나갈 때 list에 담긴 갯수 log
    @GetMapping("/")
    public FavoritePageResponseDto getFavoritePage(@RequestHeader HttpHeaders headers) {
        Long userId = JwtTokenProvider.getUserIdFromJwtToken(userService,headers);

        LocalDate today = LocalDate.now();

        // 국가 지수
        List<PriceIndexResponseDto> countryIndices = priceIndexService.getIndices("c", today).stream().map(PriceIndexResponseDto::new).collect(Collectors.toList());

        // 즐겨찾기 지수
        List<PriceIndexResponseDto> favoriteIndices = priceIndexService.getFavoriteIndices(userId, today).stream().map(PriceIndexResponseDto::new).collect(Collectors.toList());

        // 업태 종류
        ArrayList<BusinessTypeResponseDto> businessTypesResponseDtos = new ArrayList<>();
        for(BusinessType businessType: BusinessType.values()) {
            businessTypesResponseDtos.add(new BusinessTypeResponseDto(businessType, businessType.getKrName()));
        }

        // 즐겨찾기 상품 목록
        List<FavoriteGoods> favoriteGoodsList = favoriteGoodsService.getFavoriteGoodsList(userId);
        List<FavoriteItemResponseDto> favoriteItemResponseDtos = new ArrayList<>();
        List<GoodsPrice> goodsPrices;
        // 최근 가격 변동 계산을 위해 가격 정보 중에서 가장 최근 가격 정보 둘의 차를 구함(업태는 대형마트가 default)
        double priceGap;
        for(FavoriteGoods favoriteGoods: favoriteGoodsList) {
            goodsPrices = goodsPriceService.getGoodsPrices(favoriteGoods.getGoods().getId(), BusinessType.m);
            priceGap = goodsPrices.get(goodsPrices.size() - 1).getPrice() - goodsPrices.get(goodsPrices.size() - 2).getPrice();

            favoriteItemResponseDtos.add(new FavoriteItemResponseDto(favoriteGoods.getGoods(), priceGap));
        }

        // 즐겨찾기 상품 총합
        List<FavoriteTotalPriceResponseDto> favoriteTotalPriceResponseDtos = favoriteTotalPriceService.getFavoriteTotalPrices(userId, BusinessType.m, today).stream().map(FavoriteTotalPriceResponseDto::new).collect(Collectors.toList());

        return new FavoritePageResponseDto(countryIndices, favoriteIndices, businessTypesResponseDtos, favoriteItemResponseDtos, favoriteTotalPriceResponseDtos);
    }

    /**
     * 상품 선택 페이지에 띄울 카테고리 목록
     */
    // TODO: 카테고리 및 품목으로 변경
    // TODO: 리스트 개수 log
    @GetMapping("/select")
    public List<GoodsSelectCategoryResponseDto> getAllCategories() {
        return categoryService.getAllCategories().stream().map(GoodsSelectCategoryResponseDto::new).collect(Collectors.toList());
    }

    /**
     * 카테고리 선택 시, 해당 카테고리의 품목들과 상품들
     */
    // TODO: 상품으로 변경
    // TODO: 품목 pk와 상품 리스트 개수 log
    @GetMapping("/select/category/{categoryId}")
    public List<GoodsSelectProductResponseDto> getCategoryProducts(@PathVariable Long categoryId) {
        Category category = categoryService.getCategory(categoryId);
        return category.getProducts().stream().map(GoodsSelectProductResponseDto::new).collect(Collectors.toList());
    }

    /**
     * 즐겨찾기 목록 갱신
     * 되긴 하는데 엄청 오래걸림...코드를 뜯어 고쳐야 할 것 같음
     */
    // TODO: return 값 수정(DTO)
    // TODO: 들어올 때 user pk랑 즐겨찾기 개수 log, 나갈 때 합산 및 지수 최신값 log
    @PostMapping("/")
    public boolean updateFavoriteGoods(@RequestBody FavoriteUpdateRequestDto favoriteUpdateRequestDto, @RequestHeader HttpHeaders headers) {
        List<Long> goodsIds = favoriteUpdateRequestDto.getGoodsIds();
        User user = JwtTokenProvider.getUserFromJwtToken(userService,headers);
        Goods goods;

        // TODO: 쿼리가 너무 많이 나갈 것 같음...
        // 즐겨찾기 목록에서 삭제할 항목들
        List<FavoriteGoods> deleteFavoriteGoodsList = user.getFavoriteGoods();
        // 즐겨찾기 목록에 추가할 항목들
        List<FavoriteGoods> addFavoriteGoodsList = new ArrayList<>();
        boolean[] exists = new boolean[goodsIds.size()];

        FavoriteGoods favoriteGoods;
        Long goodsId;
        // 일단 사용자의 즐겨찾기 목록을 전부 삭제할 목록에 넣어두고
        // 반복문을 돌면서 남겨둘 항목은 삭제할 목록에서 제거
        for(int i = 0; i < deleteFavoriteGoodsList.size(); i++) {
            favoriteGoods = deleteFavoriteGoodsList.get(i);

            for(int j = 0; j < goodsIds.size(); j++) {
                goodsId = goodsIds.get(j);

                if(favoriteGoods.getGoods().getId().equals(goodsId)) {
                    deleteFavoriteGoodsList.remove(i);
                    // 입력으로 받은 것들 중에서 이미 존재하는 것에는 exist를 체크
                    exists[j] = true;
                    break;
                }
            }
        }

        // exist가 false인 항목들만 새로 추가
        for(int i = 0; i < exists.length; i++) {
            if(!exists[i]) {
                goods = goodsService.getGoodsById(goodsIds.get(i));
                addFavoriteGoodsList.add(new FavoriteGoods(user, goods));
            }
        }

        // 즐겨찾기 목록 갱신
        favoriteGoodsService.updateFavoriteGoodsList(addFavoriteGoodsList, deleteFavoriteGoodsList);

        // 즐겨찾기 총합 계산
        updateFavoriteTotalPrice(user);


        return true;
    }

    @GetMapping("/business/{businessType}")
    public List<FavoriteItemResponseDto> getFavoriteGoodsSelectedBusinessType(@PathVariable String businessType, @RequestHeader HttpHeaders headers) {
        Long userId = getUserIdFromJwtToken(headers);

        List<FavoriteGoods> favoriteGoodsList = favoriteGoodsService.getFavoriteGoodsList(userId);
        List<FavoriteItemResponseDto> favoriteItemResponseDtos = new ArrayList<>();
        List<GoodsPrice> goodsPrices;
        // 최근 가격 변동 계산을 위해 가격 정보 중에서 가장 최근 가격 정보 둘의 차를 구함(업태는 대형마트가 default)
        Double priceGap;
        for (FavoriteGoods favoriteGoods : favoriteGoodsList) {
            goodsPrices = goodsPriceService.getGoodsPrices(favoriteGoods.getGoods().getId(), BusinessType.valueOf(businessType));
            priceGap = goodsPrices.get(goodsPrices.size() - 1).getPrice() - goodsPrices.get(goodsPrices.size() - 2).getPrice();

            favoriteItemResponseDtos.add(new FavoriteItemResponseDto(favoriteGoods.getGoods(), priceGap));
        }

        return favoriteItemResponseDtos;
    }

    // 지수 직접 추가용으로 만든 임시 api

    @PostMapping("/addtest")
    public boolean addPriceIndex(@RequestBody AddPriceIndexDto addPriceIndexDto) {
        return priceIndexService.addIndex(addPriceIndexDto.dtype, addPriceIndexDto.date, addPriceIndexDto.value);
    }

    // 즐겨찾기 총합 계산하는 함수
    private boolean updateFavoriteTotalPrice(User user) {
        // 사용자의 즐겨찾기 목록을 가져옴
        List<FavoriteGoods> favoriteGoodsList = favoriteGoodsService.getFavoriteGoodsList(user.getId());

        // 즐겨찾기 목록을 이용해서 상품을 리스트에 저장
        List<Goods> goodsList = new ArrayList<>();
        for (FavoriteGoods favoriteGoodsIter : favoriteGoodsList) {
            goodsList.add(favoriteGoodsIter.getGoods());
        }

        List<GoodsPrice> goodsPriceList;
        List<FavoriteTotalPrice> favoriteTotalPrices = new ArrayList<>();
        // 각 업태 별로 나눠서 계산
        for (BusinessType businessType : BusinessType.values()) {
            // 즐겨찾기 목록에 있는 상품들의 해당 업태 가격들을 가져옴
            goodsPriceList = goodsPriceService.getGoodsPricesInList(goodsList, businessType);

            // 날짜를 key값으로 각 날짜의 상품 가격 총합을 저장
            Map<LocalDate, Double> dateTotalPrices = new HashMap<>();
            Double cur;
            for (GoodsPrice goodsPrice : goodsPriceList) {
                cur = 0.0;

                if (dateTotalPrices.containsKey(goodsPrice.getResearchDate()))
                    cur = dateTotalPrices.get(goodsPrice.getResearchDate());

                dateTotalPrices.put(goodsPrice.getResearchDate(), cur + goodsPrice.getPrice());
            }

            // 계산한 총합을 리스트에 추가
            FavoriteTotalPrice favoriteTotalPrice;
            for (LocalDate key : dateTotalPrices.keySet()) {
                favoriteTotalPrice = FavoriteTotalPrice.createFavoriteTotalPrice(user, dateTotalPrices.get(key), key, businessType);
                favoriteTotalPrices.add(favoriteTotalPrice);
            }
        }

        return favoriteTotalPriceService.updateFavoriteTotalPrice(user, favoriteTotalPrices);
    }

    private boolean updateFavoriteIndex(User user) {
        // 사용자의 즐겨찾기 목록을 가져옴
        List<FavoriteGoods> favoriteGoodsList = favoriteGoodsService.getFavoriteGoodsList(user.getId());

        // 즐겨찾기 목록을 이용해서 상품을 리스트에 저장
        List<Goods> goodsList = new ArrayList<>();
        for (FavoriteGoods favoriteGoods : favoriteGoodsList) {
            goodsList.add(favoriteGoods.getGoods());
        }


        // 지수 계산식

        return true;
    }

    // 지수 직접 추가에 사용하는 임시 dto
    @Data
    @AllArgsConstructor
    private static class AddPriceIndexDto {
        private String dtype;

        private String date;

        private double value;
    }
}
