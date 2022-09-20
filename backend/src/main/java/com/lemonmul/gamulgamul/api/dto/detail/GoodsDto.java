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

    private int capacity;
    private String measure;
    private int ea;

    private List<PriceDto> goodsPrices;

    public GoodsDto(Goods goods,double price,List<GoodsPrice> prices) {
        goodsName=goods.getName();
        goodsImg=goods.getImg();
        cheapPrice=price;
        cheapUrl=goods.getCheapUrl();
        capacity=goods.getCapacity();
        measure=goods.getMeasure();
        ea=goods.getEa();
        goodsPrices=prices.stream().map(PriceDto::new).collect(Collectors.toList());
    }
}
