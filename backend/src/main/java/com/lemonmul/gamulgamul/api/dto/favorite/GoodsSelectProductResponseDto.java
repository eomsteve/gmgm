package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

// 상품 선택 페이지에 품목 정보를 반환하는 Dto
@Data
@AllArgsConstructor
public class GoodsSelectProductResponseDto {
    private Long id;

    private String name;

    private List<GoodsSelectGoodsResponseDto> goodsSelectGoodsResponseDtos;

    public GoodsSelectProductResponseDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.goodsSelectGoodsResponseDtos = product.getGoods().stream().map(GoodsSelectGoodsResponseDto::new).collect(Collectors.toList());
    }
}
