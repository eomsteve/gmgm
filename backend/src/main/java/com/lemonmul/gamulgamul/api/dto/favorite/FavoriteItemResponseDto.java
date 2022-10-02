package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AllArgsConstructor;
import lombok.Data;

// 즐겨찾기 목록에 띄워줄 아이템을 반환하는 Dto
@Data
@AllArgsConstructor
public class FavoriteItemResponseDto {
    private Long goodsId;
    private Long basicProductId;
    private String goodsName;
    private String goodsImg;
    private String measure;
    private Double recentPriceOff;
    private Double recentPriceOn;
    private Double priceGapOff;
    private Double priceGapOn;

    public FavoriteItemResponseDto(Goods goods) {
        this.goodsId = goods.getId();
        this.basicProductId = goods.getProduct().getId();
        this.goodsName = goods.getName();
        this.goodsImg = goods.getImg();
        this.measure = goods.getMeasure();
        this.recentPriceOff = goods.getRecentPriceOff();
        this.recentPriceOn = goods.getRecentPriceOn();
        this.priceGapOff = goods.getPriceGapOff();
        this.priceGapOn = goods.getPriceGapOn();
    }

    public FavoriteItemResponseDto(FavoriteGoods favoriteGoods) {
        Goods goods = favoriteGoods.getGoods();

        this.goodsId = goods.getId();
        this.basicProductId = goods.getProduct().getId();
        this.goodsName = goods.getName();
        this.goodsImg = goods.getImg();
        this.measure = goods.getMeasure();
        this.recentPriceOff = goods.getRecentPriceOff();
        this.recentPriceOn = goods.getRecentPriceOn();
        this.priceGapOff = goods.getPriceGapOff();
        this.priceGapOn = goods.getPriceGapOn();
    }
}
