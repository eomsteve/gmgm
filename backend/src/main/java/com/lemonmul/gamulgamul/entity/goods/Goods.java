package com.lemonmul.gamulgamul.entity.goods;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Goods {

    @Column(name = "goods_id")
    @Id
    private Long id;

    private String name;

    private String img;

    private String measure;

    private String cheapUrl;

    private double priceGapOff;

    private double priceGapOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "goods")
    private final List<GoodsPrice> goodsPrices = new ArrayList<>();

    @OneToMany(mappedBy = "goods")
    private final List<FavoriteGoods> favoriteGoods = new ArrayList<>();

    private Goods(Long id, String name, String img, String measure, String cheapUrl, Product product) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.measure = measure;
        this.cheapUrl = cheapUrl;
        this.product = product;
    }

    public static Goods of(Long id, String name, String img, String measure, String cheapUrl, Product product) {
        return new Goods(id, name, img, measure, cheapUrl, product);
    }
}
