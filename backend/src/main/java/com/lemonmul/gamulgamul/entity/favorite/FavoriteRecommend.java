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
public class FavoriteRecommend {

    @Column(name = "favorite_recommend_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goods;

    private Double score;

    private FavoriteRecommend(User user, Goods goods) {
        setUser(user);
        this.goods = goods;
        this.score=0.0;
    }

    public static FavoriteRecommend of(User user, Goods goods){
        return new FavoriteRecommend(user,goods);
    }

    public void setUser(User user){
        this.user=user;
        user.getFavoriteRecommends().add(this);
    }
}
