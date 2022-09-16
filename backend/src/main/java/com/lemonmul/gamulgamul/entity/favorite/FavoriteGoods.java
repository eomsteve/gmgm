package com.lemonmul.gamulgamul.entity.favorite;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteGoods {

    @Id
    @GeneratedValue
    @Column(name = "favorite_goods_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goods;

    public FavoriteGoods(User user, Goods goods) {
        this.user = user;
        this.goods = goods;
    }

    public static FavoriteGoods createFavoriteGoods(User user, Goods goods) {
        return new FavoriteGoods(user, goods);
    }

}
