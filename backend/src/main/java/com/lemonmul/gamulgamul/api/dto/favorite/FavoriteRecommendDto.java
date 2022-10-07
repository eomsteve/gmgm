package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteRecommend;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FavoriteRecommendDto {
    private Long goodsId;

    private String goodsName;

    private String img;

    public FavoriteRecommendDto(FavoriteRecommend favoriteRecommend) {
        Goods goods = favoriteRecommend.getGoods();

        this.goodsId = goods.getId();
        this.goodsName = goods.getName();
        this.img = goods.getImg();
    }
}
