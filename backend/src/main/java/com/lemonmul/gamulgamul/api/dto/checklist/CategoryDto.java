package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.Category;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CategoryDto {
    private Long id;
    private String name;
    private String img;
    private List<ProductDto> products;

    public CategoryDto(Category category) {
        id= category.getId();
        name= category.getName();
        img= category.getImg();
        products =category.getProducts().stream().map(ProductDto::new).collect(Collectors.toList());
    }
}
