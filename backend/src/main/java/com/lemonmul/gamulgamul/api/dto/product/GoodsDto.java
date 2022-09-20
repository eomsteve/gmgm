package com.lemonmul.gamulgamul.api.dto.product;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import lombok.Data;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
public class GoodsDto {
    private Long goodsId;

    private String goodsName;
    private String goodsImg;
    private double cheapPrice;
    private String cheapUrl;

    private int capacity;
    private String measure;
    private int ea;

    private List<PriceDto> goodsPrices;

    public GoodsDto(Goods goods,double price,List<GoodsPrice> prices) {
        goodsId=goods.getId();
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
