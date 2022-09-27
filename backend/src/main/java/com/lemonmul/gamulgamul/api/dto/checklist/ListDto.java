package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ListDto {
    private Long checklistId;
    private LocalDate regDate;

    public ListDto(Checklist checklist) {
        checklistId = checklist.getId();
        regDate=checklist.getRegDate();
    }
}
