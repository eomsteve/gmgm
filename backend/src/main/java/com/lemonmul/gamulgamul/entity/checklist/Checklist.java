package com.lemonmul.gamulgamul.entity.checklist;

import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Checklist {

    @Column(name = "checklist_id")
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate regDate;

    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "checklist")
    private final List<ChecklistBasicItem> checklistBasicItems = new ArrayList<>();

    @OneToMany(mappedBy = "checklist")
    private final List<ChecklistCustomItem> checklistCustomItems = new ArrayList<>();

    private Checklist(User user) {
        this.regDate = LocalDate.now();
        setIsDeleted(true);
        setUser(user);
    }

    public static Checklist of(User user){
        return new Checklist(user);
    }

    public void setIsDeleted(boolean isDeleted){
        this.isDeleted =isDeleted;
    }

    public void setUser(User user){
        this.user=user;
        user.getChecklists().add(this);
    }
}
