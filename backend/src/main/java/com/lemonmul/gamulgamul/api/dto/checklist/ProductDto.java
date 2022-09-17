package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String img;

    public ProductDto(Product product) {
        id= product.getId();
        name= product.getName();
        img= product.getImg();
    }
}
