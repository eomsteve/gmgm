package com.lemonmul.gamulgamul.entity.priceindex;

import com.lemonmul.gamulgamul.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PriceIndex {

    @Column(name = "price_index_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate researchDate;

    private Double value;

    @Enumerated(EnumType.STRING)
    private IndexType indexType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private PriceIndex(LocalDate researchDate, Double value, IndexType indexType) {
        this.researchDate = researchDate;
        this.value = value;
        this.indexType = indexType;
    }

    private PriceIndex(LocalDate researchDate, Double value, User user) {
        this(researchDate, value, IndexType.f);
        this.user = user;
    }

    public static PriceIndex of(LocalDate researchDate, Double value, IndexType indexType) {
        return new PriceIndex(researchDate, value, indexType);
    }

    public static PriceIndex of(LocalDate researchDate, Double value, User user) {
        return new PriceIndex(researchDate, value, user);
    }
}
