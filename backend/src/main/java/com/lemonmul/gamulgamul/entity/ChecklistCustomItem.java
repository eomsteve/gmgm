package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ChecklistCustomItem {

    @Column(name = "checklist_custom_item")
    @Id
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_id")
    private Checklist checklist;

}
