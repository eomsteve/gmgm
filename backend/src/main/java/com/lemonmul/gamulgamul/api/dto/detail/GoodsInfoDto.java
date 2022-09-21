package com.lemonmul.gamulgamul.api.dto.detail;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.Data;

@Data
public class GoodsInfoDto {
    private Long goodsId;
    private String goodsName;

    public GoodsInfoDto(Goods goods) {
        goodsId=goods.getId();
        goodsName=goods.getName();
    }
}
