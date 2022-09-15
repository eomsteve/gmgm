package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
public class ProductPrice {

    @Column(name = "product_price_id")
    @Id
    @GeneratedValue
    private Long id;

    private Double price;

    private LocalDate researchDate;

    @Enumerated(EnumType.STRING)
    private DateType dateType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

}
