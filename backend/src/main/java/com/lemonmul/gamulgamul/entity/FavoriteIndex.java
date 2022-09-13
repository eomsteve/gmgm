package com.lemonmul.gamulgamul.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue("favorite")
public class FavoriteIndex extends PriceIndex{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public FavoriteIndex(LocalDate researchDate, Double value) {
        super(researchDate, value);
    }

    public FavoriteIndex createFavoriteIndex(LocalDate researchDate, Double value, User user) {
        FavoriteIndex favoriteIndex = new FavoriteIndex(researchDate, value);
        this.user = user;
        return favoriteIndex;
    }
}
