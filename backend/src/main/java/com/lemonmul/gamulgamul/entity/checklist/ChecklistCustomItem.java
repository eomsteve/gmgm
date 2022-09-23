package com.lemonmul.gamulgamul.entity.checklist;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChecklistCustomItem {

    @Column(name = "checklist_custom_item_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_id")
    private Checklist checklist;

    private ChecklistCustomItem(String name, Checklist checklist) {
        this.name = name;
        setChecklist(checklist);
    }

    public static ChecklistCustomItem of(String name, Checklist checklist){
        return new ChecklistCustomItem(name,checklist);
    }

    public void setChecklist(Checklist checklist){
        this.checklist=checklist;
        checklist.getChecklistCustomItems().add(this);
    }
}
