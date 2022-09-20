package com.lemonmul.gamulgamul.entity.user;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.priceindex.FavoriteIndex;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    private String email;

    private String pwd;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean status;

    @OneToMany(mappedBy = "user")
    private final List<Checklist> checklists = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private final List<FavoriteIndex> favoriteIndices = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private final List<FavoriteTotalPrice> favoriteTotalPrices = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private final List<FavoriteGoods> favoriteGoods = new ArrayList<>();

    private User(String email, String pwd, String name, Gender gender, LocalDate birthday, Role role, Boolean status) {
        this.email = email;
        this.pwd = pwd;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.role = role;
        this.status = status;
    }

    public static User of(String email, String pwd, String name, Gender gender, LocalDate birthday, Role role) {
        return new User(email, pwd, name, gender, birthday, role, true);
    }
}
