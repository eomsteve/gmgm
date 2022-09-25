package com.lemonmul.gamulgamul.entity.checklist;

import com.lemonmul.gamulgamul.entity.product.Product;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChecklistBasicItem {

    @Column(name = "checklist_basic_item_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_id")
    private Checklist checklist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private ChecklistBasicItem(Checklist checklist, Product product) {
        setChecklist(checklist);
        this.product = product;
    }

    public static ChecklistBasicItem of(Checklist checklist,Product product){
        return new ChecklistBasicItem(checklist,product);
    }

    public void setChecklist(Checklist checklist){
        this.checklist=checklist;
        checklist.getChecklistBasicItems().add(this);
    }
}
