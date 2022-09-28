package com.lemonmul.gamulgamul.api.dto;

import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.Data;

@Data
public class ProductDto {
    private Long basicProductId;
    private String basicProductName;
    private String productImg;

    public ProductDto(Product product) {
        basicProductId = product.getId();
        basicProductName = product.getName();
        productImg = product.getImg();
    }
}
