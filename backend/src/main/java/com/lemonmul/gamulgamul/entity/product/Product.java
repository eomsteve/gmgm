package com.lemonmul.gamulgamul.entity.product;

import com.lemonmul.gamulgamul.entity.Category;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
public class Product {

    @Column(name = "product_id")
    @Id
    private Long id;

    private String name;

    private Integer unit;

    private String measure;

    private Double weight;

    private String img;

    private double priceGapOff;

    private double priceGapOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private final List<Goods> goods = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private final List<ProductPrice> productPrices = new ArrayList<>();

    private Product(Long id, Category category, String name, Integer unit, String measure, Double weight, String img) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.unit = unit;
        this.measure = measure;
        this.weight = weight;
        this.img = img;
    }

    public static Product of(Long id, Category category, String name, Integer unit, String measure, Double weight, String img) {
        return new Product(id, category, name, unit, measure, weight, img);
    }
}
