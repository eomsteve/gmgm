package com.lemonmul.gamulgamul.entity;

import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Category {

    @Column(name = "category_id")
    @Id
    private Long id;

    private String name;

    private String img;

    @OneToMany(mappedBy = "category")
    private final List<Product> products = new ArrayList<>();

    private Category(Long id, String name, String img) {
        this.id = id;
        this.name = name;
        this.img = img;
    }

    public static Category of(Long id , String name, String img) {
        return new Category(id, name, img);
    }
}
