package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.favorite.*;
import com.lemonmul.gamulgamul.entity.*;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.jwt.JwtProperties;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
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
    @GetMapping("/")
    public FavoritePageResponseDto getFavoritePage(@RequestHeader HttpHeaders headers) {
        Long userId = getUserIdFromJwtToken(headers);

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
        Double priceGap;
        for(FavoriteGoods favoriteGoods: favoriteGoodsList) {
            goodsPrices = goodsPriceService.getGoodsPrices(favoriteGoods.getGoods().getId(), BusinessType.m);
            priceGap = goodsPrices.get(goodsPrices.size() - 1).getPrice() - goodsPrices.get(goodsPrices.size() - 2).getPrice();

            favoriteItemResponseDtos.add(new FavoriteItemResponseDto(favoriteGoods.getGoods(), priceGap));
        }

        // 즐겨찾기 상품 총합
        List<FavoriteTotalPrice> favoriteTotalPrices = favoriteTotalPriceService.getFavoriteTotalPrices(userId, BusinessType.m, today);

        return new FavoritePageResponseDto(countryIndices, favoriteIndices, businessTypesResponseDtos, favoriteItemResponseDtos, favoriteTotalPrices);
    }

    /**
     * 상품 선택 페이지에 띄울 카테고리 목록
     */
    @GetMapping("/select")
    public List<GoodsSelectCategoryResponseDto> getAllCategories() {
        return categoryService.getAllCategories().stream().map(GoodsSelectCategoryResponseDto::new).collect(Collectors.toList());
    }

    /**
     * 카테고리 선택 시, 해당 카테고리의 품목들과 상품들
     */
    @GetMapping("/select/category/{categoryId}")
    public List<GoodsSelectProductResponseDto> getCategoryProducts(@PathVariable Long categoryId) {
        Category category = categoryService.getCategory(categoryId);
        return category.getProducts().stream().map(GoodsSelectProductResponseDto::new).collect(Collectors.toList());
    }

    /**
     * 즐겨찾기 목록 갱신
     */
    @PostMapping("/")
    public boolean updateFavoriteGoods(@RequestBody List<Integer> goodsIds, @RequestHeader HttpHeaders headers) {
        User user = getUserFromJwtToken(headers);
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
                goodsId = (long)goodsIds.get(j);

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
                goods = goodsService.getGoodsById((long)goodsIds.get(i));
                addFavoriteGoodsList.add(new FavoriteGoods(user, goods));
            }
        }

        return favoriteGoodsService.updateFavoriteGoodsList(addFavoriteGoodsList, deleteFavoriteGoodsList);
    }

    // 지수 직접 추가용으로 만든 임시 api
    @PostMapping("/addtest")
    public boolean addPriceIndex(@RequestBody AddPriceIndexDto addPriceIndexDto) {
        return priceIndexService.addIndex(addPriceIndexDto.dtype, addPriceIndexDto.date, addPriceIndexDto.value);
    }

    private Long getUserIdFromJwtToken(HttpHeaders headers) {
        String token = headers.get(JwtProperties.HEADER_STRING).get(0).replace(JwtProperties.TOKEN_PREFIX, "");
        String email = JwtTokenProvider.getEmail(token);
        User user = userService.getUserInfoByEmail(email);
        return user.getId();
    }

    private User getUserFromJwtToken(HttpHeaders headers) {
        String token = headers.get(JwtProperties.HEADER_STRING).get(0).replace(JwtProperties.TOKEN_PREFIX, "");
        String email = JwtTokenProvider.getEmail(token);
        return userService.getUserInfoByEmail(email);
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
