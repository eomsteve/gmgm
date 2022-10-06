package com.lemonmul.gamulgamul.api.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// 즐겨찾기 목록 갱신 요청을 받는 Dto
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteUpdateRequestDto {
    private List<Long> goodsIds;
}
