package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AllArgsConstructor;
import lombok.Data;

// 상품 선택 페이지에 상품 정보를 반환하는 Dto
@Data
@AllArgsConstructor
public class GoodsSelectGoodsResponseDto {
    private Long id;

    private String name;

    private String img;

    private Integer capacity;

    private String measure;

    private Integer ea;

    public GoodsSelectGoodsResponseDto(Goods goods) {
        this.id = goods.getId();
        this.name = goods.getName();
        this.img = goods.getImg();
        this.capacity = goods.getCapacity();
        this.measure = goods.getMeasure();
        this.ea = goods.getEa();
    }
}
