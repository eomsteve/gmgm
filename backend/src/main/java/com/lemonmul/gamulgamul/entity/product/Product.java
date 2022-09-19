package com.lemonmul.gamulgamul.entity.product;

import com.lemonmul.gamulgamul.entity.Category;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
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
    private final List<Goods> goods = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private final List<ProductPrice> productPrices = new ArrayList<>();

    //todo 이거 굳이 필요한가..?
    @OneToMany(mappedBy = "product")
    private final List<ChecklistBasicItem> checklistBasicItems = new ArrayList<>();

    public Product(Long id, Category category, String name, Integer unit, String measure, Double weight, String img) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.unit = unit;
        this.measure = measure;
        this.weight = weight;
        this.img = img;
    }

    public static Product createProduct(Long id, Category category, String name, Integer unit, String measure, Double weight, String img) {
        return new Product(id, category, name, unit, measure, weight, img);
    }
}
