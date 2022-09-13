package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Product {

    @Column(name = "product_id")
    @Id
    private Long id;

    private String name;

    private Integer unit;

    private String measure;

    private Double weight;

    private String img;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private final List<Goods> goods=new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private final List<ProductPrice> productPrices=new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private final List<ChecklistBasicItem> checklistBasicItems=new ArrayList<>();

}
