package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

// 즐겨찾기 페이지에 띄워줄 전체 정보를 반환하는 Dto
@Data
@AllArgsConstructor
public class FavoritePageResponseDto {
    private PriceIndexResponseDto countryIndices;
    private PriceIndexResponseDto favoriteIndices;
    private List<FavoriteItemResponseDto> favoriteItems;
    private List<FavoriteRecommendDto> favoriteRecommends;
    private FavoriteTotalPriceResponseDto favoriteTotalPrices;
}
