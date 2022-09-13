package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Goods {

    @Column(name = "goods_id")
    @Id
    private Long id;

    private String name;

    private String img;

    private Integer capacity;

    private String measure;

    private Integer ea;

    private String cheapUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "goods")
    private final List<GoodsPrice> goodsPrices=new ArrayList<>();

    @OneToMany(mappedBy = "goods")
    private final List<FavoriteGoods> favoriteGoods=new ArrayList<>();

}
