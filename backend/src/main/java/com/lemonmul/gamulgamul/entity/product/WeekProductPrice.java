package com.lemonmul.gamulgamul.entity.product;

import com.lemonmul.gamulgamul.entity.BusinessType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue("w")
public class WeekProductPrice extends ProductPrice{

    @Enumerated(EnumType.STRING)
    private BusinessType businessType;

    public WeekProductPrice(Double price, LocalDate researchDate, Product product, BusinessType businessType) {
        super(price, researchDate, product);
        this.businessType = businessType;
    }

    public static WeekProductPrice createWeekProductPrice(Double price, LocalDate researchDate, Product product, BusinessType businessType) {
        return new WeekProductPrice(price, researchDate, product, businessType);
    }
}
