package com.lemonmul.gamulgamul.entity.product;

import com.lemonmul.gamulgamul.entity.BusinessType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductPrice {

    @Column(name = "product_price_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double unitPrice;

    private Double price;

    private LocalDate researchDate;

    @Enumerated(EnumType.STRING)
    private DateType dateType;

    @Enumerated(EnumType.STRING)
    private BusinessType business;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private ProductPrice(Double unitPrice, LocalDate researchDate, Product product) {
        this.unitPrice = unitPrice;
        this.price = null;
        this.researchDate = researchDate;
        this.product = product;

        this.dateType=DateType.m;
        this.business=null;
    }

    private ProductPrice(Double unitPrice, Double price, LocalDate researchDate, BusinessType business, Product product) {
        this(unitPrice, researchDate, product);

        this.price = price;
        this.dateType=DateType.d;
        this.business = business;
    }

    public static ProductPrice of(Double price, LocalDate researchDate, Product product){
        return new ProductPrice(price,researchDate,product);
    }

    public static ProductPrice of(Double unitPrice, Double price, LocalDate researchDate, BusinessType business, Product product){
        return new ProductPrice(unitPrice, price,researchDate,business,product);
    }
}
