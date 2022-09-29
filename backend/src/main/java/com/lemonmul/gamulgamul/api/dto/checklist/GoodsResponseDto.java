package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class GoodsResponseDto {
    private List<GoodsInfoDto> goodsList;

    public GoodsResponseDto(List<Goods> goods) {
        goodsList=goods.stream().map(GoodsInfoDto::new).collect(Collectors.toList());
    }
}
