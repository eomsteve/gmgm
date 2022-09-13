package com.lemonmul.gamulgamul.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class Business {

    @Id
    @GeneratedValue
    @Column(name = "business_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "business")
    private final List<FavoriteTotalPrice> favoriteTotalPrices = new ArrayList<>();

    @OneToMany(mappedBy = "business")
    private final List<GoodsPrice> goodsPrices = new ArrayList<>();
}
