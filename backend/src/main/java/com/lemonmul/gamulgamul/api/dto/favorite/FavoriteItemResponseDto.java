package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AllArgsConstructor;
import lombok.Data;

// 즐겨찾기 목록에 띄워줄 아이템을 반환하는 Dto
@Data
@AllArgsConstructor
public class FavoriteItemResponseDto {
    private Long id;

    private String name;

    private String img;

    private Integer capacity;

    private String measure;

    private Integer ea;

    private Double priceGap;

    public FavoriteItemResponseDto(Goods goods, Double priceGap) {
        this.id = goods.getId();
        this.name = goods.getName();
        this.img = goods.getImg();
        this.capacity = goods.getCapacity();
        this.measure = goods.getMeasure();
        this.ea = goods.getEa();
        this.priceGap = priceGap;
    }
}
