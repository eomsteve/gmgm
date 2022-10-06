package com.lemonmul.gamulgamul.entity.goods;

import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoodsLog {

    @Column(name = "goods_log_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goods;

    private LocalDateTime clickTime;

    private GoodsLog(User user, Goods goods) {
        this.user = user;
        this.goods = goods;
        this.clickTime=LocalDateTime.now();
    }

    public static GoodsLog of(User user, Goods goods){
        return new GoodsLog(user,goods);
    }
}
