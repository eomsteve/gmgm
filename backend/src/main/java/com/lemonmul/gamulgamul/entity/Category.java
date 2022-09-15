package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Category {

    @Column(name = "category_id")
    @Id
    private Long id;

    private String name;

    private String img;

    @OneToMany(mappedBy = "category")
    private final List<Product> products = new ArrayList<>();

}
