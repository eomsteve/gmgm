package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChecklistListDto {
    private Long checklistId;
    private LocalDate regDate;

    public ChecklistListDto(Checklist checklist) {
        checklistId = checklist.getId();
        regDate=checklist.getRegDate();
    }
}
