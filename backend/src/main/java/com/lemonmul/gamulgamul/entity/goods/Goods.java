package com.lemonmul.gamulgamul.entity.goods;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
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
    private final List<GoodsPrice> goodsPrices = new ArrayList<>();

    @OneToMany(mappedBy = "goods")
    private final List<FavoriteGoods> favoriteGoods = new ArrayList<>();

    public Goods(Long id, String name, String img, Integer capacity, String measure, Integer ea, String cheapUrl, Product product) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.capacity = capacity;
        this.measure = measure;
        this.ea = ea;
        this.cheapUrl = cheapUrl;
        this.product = product;
    }

    public static Goods createGoods(Long id, String name, String img, Integer capacity, String measure, Integer ea, String cheapUrl, Product product) {
        return new Goods(id, name, img, capacity, measure, ea, cheapUrl, product);
    }
}
