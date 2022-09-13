package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ProductPrice {

    @Column(name = "product_price_id")
    @Id
    private Long id;

    private double price;

    private LocalDateTime researchDate;

    private DateType dateType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

}
