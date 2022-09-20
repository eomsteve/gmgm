package com.lemonmul.gamulgamul.entity.priceindex;

import com.lemonmul.gamulgamul.entity.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue("f")
public class FavoriteIndex extends PriceIndex {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private FavoriteIndex(LocalDate researchDate, Double value, User user) {
        super(researchDate, value);
        this.user = user;
    }

    public static FavoriteIndex of(LocalDate researchDate, Double value, User user) {
        return new FavoriteIndex(researchDate, value, user);
    }
}
