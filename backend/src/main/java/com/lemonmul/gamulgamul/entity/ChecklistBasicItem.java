package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ChecklistBasicItem {

    @Column(name = "checklist_basic_item")
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_id")
    private Checklist checklist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

}
