package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class ListInfoDto {
    private Long checklistId;
    private LocalDate regDate;
    private List<ItemDto> itemInfos=new ArrayList<>();

    public ListInfoDto(Checklist checklist) {
        checklistId = checklist.getId();
        regDate=checklist.getRegDate();

        int infoSize=4;
        List<ItemDto> basicItems = checklist.getChecklistBasicItems().stream().limit(infoSize).map(ItemDto::new).toList();
        itemInfos.addAll(basicItems);
        if(itemInfos.size()<infoSize){
            List<ItemDto> customItems = checklist.getChecklistCustomItems().stream().limit(infoSize - itemInfos.size()).map(ItemDto::new).toList();
            itemInfos.addAll(customItems);
        }
    }
}
