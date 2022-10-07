package com.lemonmul.gamulgamul.api.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AddFavoriteGoodsResponseDto {
    private FavoriteItemResponseDto newGoods;
    private List<FavoriteRecommendDto> favoriteRecommends;
}
