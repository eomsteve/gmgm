package com.lemonmul.gamulgamul.api.dto;

import com.lemonmul.gamulgamul.entity.Category;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CategoryDto {
    private Long categoryId;
    private String categoryName;
    private String categoryImg;
    private List<ProductDto> products;

    public CategoryDto(Category category) {
        categoryId= category.getId();
        categoryName = category.getName();
        categoryImg = category.getImg();
        products =category.getProducts().stream().map(ProductDto::new).collect(Collectors.toList());
    }
}
