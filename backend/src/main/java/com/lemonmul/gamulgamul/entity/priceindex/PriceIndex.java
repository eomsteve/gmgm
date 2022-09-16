package com.lemonmul.gamulgamul.entity.priceindex;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public class PriceIndex {

    @Column(name = "price_index_id")
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate researchDate;

    private Double value;

    @Column(insertable = false, updatable = false)
    private String dtype;

    protected PriceIndex(LocalDate researchDate, Double value) {
        this.researchDate = researchDate;
        this.value = value;
    }
}
