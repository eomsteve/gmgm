package com.lemonmul.gamulgamul.api.dto.detail;

import lombok.Data;

@Data
public class FavoriteDto {
    private ProductDto product;
    private GoodsDto goods;

    public FavoriteDto(ProductDto productDto,GoodsDto goodsDto) {
        product = productDto;
        goods=goodsDto;
    }
}
