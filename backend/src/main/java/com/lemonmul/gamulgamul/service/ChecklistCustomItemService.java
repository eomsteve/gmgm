package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.checklist.CustomItemDto;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import com.lemonmul.gamulgamul.repo.ChecklistCustomItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChecklistCustomItemService {

    private final ChecklistCustomItemRepo itemRepo;

    /**
     * 체크리스트 수정 - 커스텀 아이템 업데이트
     */
    @Transactional
    public void updateItems(Checklist checklist,List<CustomItemDto> itemDto){
        List<ChecklistCustomItem> items = itemRepo.findByChecklist(checklist);
        List<Long> deleteIds=new ArrayList<>();
        for (ChecklistCustomItem item : items) {
            Optional<CustomItemDto> optional = itemDto.stream()
                    .filter(i -> item.getId().equals(i.getId())).findAny();
            //체크리스트에서 없어진 아이템 제거
            if(optional.isEmpty()){
                deleteIds.add(item.getId());
            }
        }
        itemRepo.deleteAllById(deleteIds);

        //체크리스트에 새로 추가된 아이템들
        List<CustomItemDto> updatedItemDto = itemDto
                .stream().filter(i -> i.getId() < 0).toList();
        List<ChecklistCustomItem> updatedItems=new ArrayList<>();
        for (CustomItemDto dto : updatedItemDto) {
            String customProductName = dto.getCustomProductName();
            //품목 이름 공백이면 버리기
            if(!customProductName.isBlank()) {
                updatedItems.add(ChecklistCustomItem.of(customProductName, checklist));
            }
        }
        itemRepo.saveAll(updatedItems);
    }

    @Transactional
    public void updateStatus(Checklist checklist, List<CustomItemDto> checklistCustomItem) {
        List<ChecklistCustomItem> customItems = itemRepo.findByChecklist(checklist);
        for (ChecklistCustomItem customItem : customItems) {
            CustomItemDto itemDto = checklistCustomItem.stream()
                    .filter(i -> customItem.getId().equals(i.getId())).findAny()
                    .orElseThrow(() -> new IllegalArgumentException("해당 항목이 존재하지 않습니다."));
            customItem.setStatus(itemDto.isStatus());
        }
    }
}
