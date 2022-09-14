package com.lemonmul.gamulgamul.entity;

import lombok.AccessLevel;
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
public class User {

    @Id
    @GeneratedValue
    @Column(name="user_id")
    private Long id;

    private String email;

    private String pwd;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private final List<Checklist> checklists = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private final List<FavoriteIndex> favoriteIndices = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private final List<FavoriteTotalPrice> favoriteTotalPrices = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private final List<FavoriteGoods> favoriteGoods = new ArrayList<>();

    public User(String email, String pwd, String name, Gender gender, LocalDate birthday, Role role) {
        this.email = email;
        this.pwd = pwd;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.role = role;
    }

    public static User createUser(String email, String pwd, String name, Gender gender, LocalDate birthday, Role role) {
        return new User(email, pwd, name, gender, birthday, role);
    }
}
