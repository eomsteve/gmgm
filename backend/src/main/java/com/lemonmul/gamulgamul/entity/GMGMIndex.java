package com.lemonmul.gamulgamul.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue("g")
public class GMGMIndex extends PriceIndex {

    public GMGMIndex(LocalDate researchDate, Double value) {
        super(researchDate, value);
    }

    public static GMGMIndex createGMGMIndex(LocalDate researchDate, Double value) {
        return new GMGMIndex(researchDate, value);
    }
}
