package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.checklist.BasicItemDto;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.repo.ChecklistBasicItemRepo;
import com.lemonmul.gamulgamul.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChecklistBasicItemService {

    private final ChecklistBasicItemRepo itemRepo;
    private final ProductRepo productRepo;

    /**
     * 체크리스트 수정 - 기본 아이템 업데이트
     */
    @Transactional
    public void updateItems(Checklist checklist,List<BasicItemDto> itemDto){
        List<ChecklistBasicItem> items = itemRepo.findByChecklist(checklist);
        List<Long> deleteIds=new ArrayList<>();
        for (ChecklistBasicItem item : items) {
            Optional<BasicItemDto> optional = itemDto.stream()
                    .filter(i -> item.getId().equals(i.getId())).findAny();
            //체크리스트에서 없어진 아이템 제거
            if(optional.isEmpty()){
                deleteIds.add(item.getId());
            }
        }
        itemRepo.deleteAllById(deleteIds);

        //체크리스트에 새로 추가된 아이템들의 품목들
        List<Long> productIds = new ArrayList<>();
        for (int i=itemDto.size()-1;i>=0;i--) {
            BasicItemDto dto = itemDto.get(i);
            if(dto.getId()<0){
                productIds.add(dto.getBasicProductId());
            }
        }
        List<Product> products = productRepo.findByIdIn(productIds);
        List<ChecklistBasicItem> updatedItems=new ArrayList<>();
        for (Product product : products) {
            updatedItems.add(ChecklistBasicItem.of(checklist,product));
        }
        itemRepo.saveAll(updatedItems);
    }

    @Transactional
    public void updateStatus(Checklist checklist, List<BasicItemDto> checklistBasicItem){
        List<ChecklistBasicItem> basicItems = itemRepo.findByChecklist(checklist);
        for (ChecklistBasicItem basicItem : basicItems) {
            BasicItemDto itemDto = checklistBasicItem.stream()
                    .filter(i -> basicItem.getId().equals(i.getId())).findAny()
                    .orElseThrow(() -> new IllegalArgumentException("해당 항목이 존재하지 않습니다."));
            basicItem.setStatus(itemDto.isStatus());
        }
    }
}
