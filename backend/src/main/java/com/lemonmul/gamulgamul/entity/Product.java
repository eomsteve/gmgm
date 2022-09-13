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

    private int unit;

    private String measure;

    private double weight;

    private String img;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<Goods> goods=new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<ProductPrice> productPrices=new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<ChecklistBasicItem> checklistBasicItems=new ArrayList<>();

}
