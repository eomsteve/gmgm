package com.lemonmul.gamulgamul.entity.product;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue("m")
public class MonthProductPrice extends ProductPrice{

    private MonthProductPrice(Double price, LocalDate researchDate, Product product) {
        super(price, researchDate, product);
    }

    public static MonthProductPrice of(Double price, LocalDate researchDate, Product product) {
        return new MonthProductPrice(price, researchDate, product);
    }
}
