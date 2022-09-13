package com.lemonmul.gamulgamul.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class PriceIndex {

    @Column(name = "price_index_id")
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate researchDate;

    private Double value;

    protected PriceIndex(LocalDate researchDate, Double value) {
        this.researchDate = researchDate;
        this.value = value;
    }
}
