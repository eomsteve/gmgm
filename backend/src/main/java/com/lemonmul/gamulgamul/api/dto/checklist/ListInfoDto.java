package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Data
public class ListInfoDto {
    private Long checklistId;
    private LocalDate regDate;
    private List<ItemDto> itemInfos=new ArrayList<>();

    public ListInfoDto(Checklist checklist) {
        checklistId = checklist.getId();
        regDate=checklist.getRegDate();

        int infoSize=4;
        Stream<ChecklistBasicItem> limit = checklist.getChecklistBasicItems().stream().sorted((o1, o2) -> (int) (o2.getId()-o1.getId())).limit(infoSize);
        List<ItemDto> basicItems = limit.map(ItemDto::new).toList();
        itemInfos.addAll(basicItems);
        if(itemInfos.size()<infoSize){
            List<ItemDto> customItems = checklist.getChecklistCustomItems().stream().limit(infoSize - itemInfos.size()).map(ItemDto::new).toList();
            itemInfos.addAll(customItems);
        }
    }
}
