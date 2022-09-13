package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class GoodsPrice {

    @Column(name = "goods_price_id")
    @Id
    private Long id;

    private double price;

    private LocalDateTime researchDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goods;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    private Business business;

}
