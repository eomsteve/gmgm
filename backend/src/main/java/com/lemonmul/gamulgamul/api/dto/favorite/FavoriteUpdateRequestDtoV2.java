package com.lemonmul.gamulgamul.api.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteUpdateRequestDtoV2 {
    private List<GoodsDto> inputGoodsList;
}
