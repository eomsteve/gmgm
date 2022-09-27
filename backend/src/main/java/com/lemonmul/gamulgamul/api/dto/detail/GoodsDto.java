package com.lemonmul.gamulgamul.api.dto.detail;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class GoodsDto {
    private String goodsName;
    private String goodsImg;
    private double cheapPrice;
    private String cheapUrl;
    private String measure;

    private List<PriceDto> goodsPrices;
    private List<DateDto> researchDates;

    public GoodsDto(Goods goods,double price,List<GoodsPrice> prices) {
        goodsName=goods.getName();
        goodsImg=goods.getImg();
        cheapPrice=price;
        cheapUrl=goods.getCheapUrl();
        measure=goods.getMeasure();
        goodsPrices=prices.stream().map(PriceDto::new).collect(Collectors.toList());
        researchDates=prices.stream().map(DateDto::new).collect(Collectors.toList());
    }
}
