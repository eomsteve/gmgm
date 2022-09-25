package com.lemonmul.gamulgamul.entity.favorite;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteTotalPrice {

    @Id
    @Column(name = "favorite_total_price_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Double totalPrice;

    private LocalDate researchDate;

    @Enumerated(EnumType.STRING)
    private BusinessType business;

    private FavoriteTotalPrice(User user, Double totalPrice, LocalDate researchDate, BusinessType business) {
        this.user = user;
        this.totalPrice = totalPrice;
        this.researchDate = researchDate;
        this.business = business;
    }

    public static FavoriteTotalPrice of(User user, Double totalPrice, LocalDate researchDate, BusinessType business) {
        return new FavoriteTotalPrice(user, totalPrice, researchDate, business);
    }
}
