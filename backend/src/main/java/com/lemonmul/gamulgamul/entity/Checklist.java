package com.lemonmul.gamulgamul.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Checklist {

    @Column(name = "checklist_id")
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate regDate;

    private Boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "checklist")
    private final List<ChecklistBasicItem> checklistBasicItems = new ArrayList<>();

    @OneToMany(mappedBy = "checklist")
    private final List<ChecklistCustomItem> checklistCustomItems = new ArrayList<>();
}
