package com.lemonmul.gamulgamul.entity.favorite;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteGoods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_goods_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goods;

    private LocalDate regDate;

    private FavoriteGoods(User user, Goods goods) {
        this.user = user;
        this.goods = goods;
        this.regDate = LocalDate.now();
    }

    private FavoriteGoods(User user, Goods goods, int dateGap) {
        this.user = user;
        this.goods = goods;
        this.regDate = LocalDate.now().minusDays(dateGap);
    }

    public static FavoriteGoods of(User user, Goods goods) {
        return new FavoriteGoods(user, goods);
    }

    public static FavoriteGoods of(User user, Goods goods, int dateGap) {
        return new FavoriteGoods(user, goods, dateGap);
    }

}
