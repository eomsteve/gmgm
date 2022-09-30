package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.Data;

@Data
public class GoodsInfoDto {
    private Long goodsId;
    private String goodsName;
    private double recentPriceOff;
    private double recentPriceOn;
    private double priceGapOff;
    private double priceGapOn;

    public GoodsInfoDto(Goods goods) {
        goodsId=goods.getId();
        goodsName= goods.getName();
        recentPriceOff=goods.getRecentPriceOff();
        recentPriceOn=goods.getRecentPriceOn();
        priceGapOff=goods.getPriceGapOff();
        priceGapOn=goods.getPriceGapOn();
    }
}