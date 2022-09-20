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
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dateType")
public class ProductPrice {

    @Column(name = "product_price_id")
    @Id
    @GeneratedValue
    private Long id;

    private Double price;

    private LocalDate researchDate;

    @Column(insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private DateType dateType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    protected ProductPrice(Double price, LocalDate researchDate, Product product) {
        this.price = price;
        this.researchDate = researchDate;
        this.product = product;
    }
}
