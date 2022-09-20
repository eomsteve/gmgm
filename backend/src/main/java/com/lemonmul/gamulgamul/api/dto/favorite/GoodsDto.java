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

    private Integer capacity;

    private String measure;

    private Integer ea;

    public GoodsDto(Goods goods) {
        this.id = goods.getId();
        this.name = goods.getName();
        this.img = goods.getImg();
        this.capacity = goods.getCapacity();
        this.measure = goods.getMeasure();
        this.ea = goods.getEa();
    }
}
