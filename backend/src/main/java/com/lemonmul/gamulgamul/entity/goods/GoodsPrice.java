package com.lemonmul.gamulgamul.entity.goods;

import com.lemonmul.gamulgamul.entity.BusinessType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class GoodsPrice {

    @Column(name = "goods_price_id")
    @Id
    @GeneratedValue
    private Long id;

    private Double price;

    private LocalDate researchDate;

    @Enumerated(EnumType.STRING)
    private BusinessType business;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goods;

    public GoodsPrice(Double price, LocalDate researchDate, BusinessType business, Goods goods) {
        this.price = price;
        this.researchDate = researchDate;
        this.business = business;
        this.goods = goods;
    }

    public static GoodsPrice createGoodsPrice(Double price, LocalDate researchDate, BusinessType business, Goods goods) {
        return new GoodsPrice(price, researchDate, business, goods);
    }
}
