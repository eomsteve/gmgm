package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDto {
    private Long goodsId;
    private String goodsName;
    private String goodsImg;
    private String measure;

    public GoodsDto(Goods goods) {
        this.goodsId = goods.getId();
        this.goodsName = goods.getName();
        this.goodsImg = goods.getImg();
        this.measure = goods.getMeasure();
    }
}
