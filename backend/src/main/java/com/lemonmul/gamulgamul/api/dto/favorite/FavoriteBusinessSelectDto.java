package com.lemonmul.gamulgamul.api.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FavoriteBusinessSelectDto {
    List<FavoriteItemResponseDto> favoriteItems;

    List<FavoriteTotalPriceResponseDto> favoriteTotalPrices;
}
