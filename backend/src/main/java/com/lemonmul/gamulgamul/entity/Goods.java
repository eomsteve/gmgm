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

    private int capacity;

    private String measure;

    private int ea;

    private String cheapUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "goods")
    private List<GoodsPrice> goodsPrices=new ArrayList<>();

    @OneToMany(mappedBy = "goods")
    private List<FavoriteGoods> favoriteGoods=new ArrayList<>();

}
