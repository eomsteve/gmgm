package com.lemonmul.gamulgamul.api.dto;

import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.Data;

@Data
public class ProductDto {
    private Long productId;
    private String productName;
    private String productImg;

    public ProductDto(Product product) {
        productId = product.getId();
        productName = product.getName();
        productImg = product.getImg();
    }
}
