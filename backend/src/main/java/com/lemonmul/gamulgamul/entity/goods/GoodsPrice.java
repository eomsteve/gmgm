package com.lemonmul.gamulgamul.entity.goods;

import com.lemonmul.gamulgamul.entity.BusinessType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoodsPrice {

    @Column(name = "goods_price_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double unitPrice;

    private Double price;

    private LocalDate researchDate;

    @Enumerated(EnumType.STRING)
    private BusinessType business;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goods;

    private GoodsPrice(Double unitPrice, Double price, LocalDate researchDate, BusinessType business, Goods goods) {
        this.unitPrice=unitPrice;
        this.price = price;
        this.researchDate = researchDate;
        this.business = business;
        this.goods = goods;
    }

    public static GoodsPrice of(Double unitPrice, Double price, LocalDate researchDate, BusinessType business, Goods goods) {
        return new GoodsPrice(unitPrice, price, researchDate, business, goods);
    }
}
