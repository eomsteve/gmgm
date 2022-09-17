package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChecklistListDto {
    private Long id;
    private LocalDate regDate;

    public ChecklistListDto(Checklist checklist) {
        id= checklist.getId();
        regDate=checklist.getRegDate();
    }
}
