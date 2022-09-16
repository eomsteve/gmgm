package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;

// 상품 선택 페이지에 카테고리 정보를 반환하는 Dto
@Data
@AllArgsConstructor
public class GoodsSelectCategoryResponseDto {
    private Long id;

    private String name;

    private String img;

    public GoodsSelectCategoryResponseDto(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.img = category.getImg();
    }
}
