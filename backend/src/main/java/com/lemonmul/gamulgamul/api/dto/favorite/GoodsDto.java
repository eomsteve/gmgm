package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GoodsDto {
    private Long id;

    private String name;

    private String img;

    private String measure;

    public GoodsDto(Goods goods) {
        this.id = goods.getId();
        this.name = goods.getName();
        this.img = goods.getImg();
        this.measure = goods.getMeasure();
    }
}
