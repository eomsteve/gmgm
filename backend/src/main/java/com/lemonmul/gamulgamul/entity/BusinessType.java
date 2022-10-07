package com.lemonmul.gamulgamul.entity;

public enum BusinessType {
    // 대형마트: mart -> m
    // 슈퍼마켓: super -> s
    // 온라인: online -> o
    m("대형마트"),
    s("슈퍼마켓"),
    o("온라인");

    private final String krName;

    BusinessType(String krName) {
        this.krName = krName;
    }

    public String getKrName() {
        return krName;
    }
}
