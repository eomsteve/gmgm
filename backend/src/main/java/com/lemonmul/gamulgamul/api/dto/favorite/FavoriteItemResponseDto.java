package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AllArgsConstructor;
import lombok.Data;

// 즐겨찾기 목록에 띄워줄 아이템을 반환하는 Dto
@Data
@AllArgsConstructor
public class FavoriteItemResponseDto {
    private Long goodsId;
    private Long productId;
    private String goodsName;
    private String img;
    private String measure;
    private Double priceGap;

    public FavoriteItemResponseDto(Goods goods, Double priceGap) {
        this.goodsId = goods.getId();
        this.productId = goods.getProduct().getId();
        this.goodsName = goods.getName();
        this.img = goods.getImg();
        this.measure = goods.getMeasure();
        this.priceGap = priceGap;
    }
}
