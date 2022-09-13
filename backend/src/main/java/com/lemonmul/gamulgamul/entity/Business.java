package com.lemonmul.gamulgamul.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class Business {

    @Id
    @GeneratedValue
    @Column(name = "business_id")
    private Long id;

    private String name;

}
