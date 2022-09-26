package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.CategoryDto;
import com.lemonmul.gamulgamul.api.dto.checklist.*;
import com.lemonmul.gamulgamul.entity.Category;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.ChecklistBasicItemRepo;
import com.lemonmul.gamulgamul.repo.ChecklistCustomItemRepo;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/checklist")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class ChecklistApi {

    private final ChecklistService checklistService;
    private final UserService userService;
    private final CategoryService categoryService;
    private final ProductService productService;
    private final ChecklistBasicItemRepo basicItemRepo;
    private final ChecklistCustomItemRepo customItemRepo;
    private final ChecklistBasicItemService basicItemService;
    private final ChecklistCustomItemService customItemService;

    /**
     * 체크리스트 리스트 조회
     * todo isEmpty 추가
     */
    @GetMapping("/list")
    public List<ChecklistListDto> checklistList(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /checklist/list");

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        List<Checklist> checklists = checklistService.checklistList(user);
        log.info("checklists size: {}",checklists.size());

        log.info("[Finished request] GET /checklist/list");
        return checklists.stream().map(ChecklistListDto::new).collect(Collectors.toList());
    }

    /**
     * 빈 체크리스트 생성
     */
    @PostMapping()
    public ChecklistResponseDto createChecklist(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] POST /checklist");

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Long checklistId = checklistService.createChecklist(user);
        log.info("checklistId: {}",checklistId);

        log.info("[Finished request] POST /checklist");
        return new ChecklistResponseDto(checklistId);
    }

    /**
     * 체크리스트 품목 선택 페이지
     */
    @GetMapping("/select")
    public List<CategoryDto> checklistProductSelect(){
        log.info("[Starting request] GET /checklist/select");

        List<Category> categories = categoryService.getAllCategories();
        log.info("categories size: {}",categories.size());

        log.info("[Finished request] GET /checklist/select");
        return categories.stream().map(CategoryDto::new).collect(Collectors.toList());
    }

    /**
     * 체크리스트 수정
     */
    @PutMapping("/{checklistId}")
    public ChecklistResponseDto modifyChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId,
                                                @RequestBody ChecklistRequestDto checklistRequestDto){
        log.info("[Starting request] PUT /checklist/{}",checklistId);

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        List<ChecklistBasicItemRequestDto> basicItem = checklistRequestDto.getChecklistBasicItems();
        List<ChecklistCustomItemRequestDto> customItem = checklistRequestDto.getChecklistCustomItems();
        log.info("basicItem size: {}, customItem size: {}",basicItem.size(),customItem.size());

        fillBasicItem(basicItem, checklist);
        fillCustomItem(customItem, checklist);

        log.info("[Finished request] PUT /checklist/{}",checklistId);
        return new ChecklistResponseDto(checklistId);
    }

    /**
     * 체크리스트 조회
     */
    @GetMapping("/{checklistId}")
    public ChecklistDto checklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        log.info("[Starting request] GET /checklist/{}",checklistId);

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        log.info("checklist size: {}",checklist.getChecklistBasicItems().size()+checklist.getChecklistCustomItems().size());

        checkOwnership(user,checklist);

        log.info("[Finished request] GET /checklist/{}",checklistId);
        return new ChecklistDto(checklist);
    }

    /**
     * 체크리스트 체크 여부 수정
     */
    @PutMapping("/status/{checklistId}")
    public Map<String, Integer> checklistStatus(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId,
                                                @RequestBody ChecklistDto checklistDto){
        log.info("[Starting request] PUT /checklist/status/{}",checklistId);

        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        List<ChecklistBasicItemDto> basicItem = checklistDto.getChecklistBasicItems();
        List<ChecklistCustomItemDto> customItem = checklistDto.getChecklistCustomItems();
        log.info("basicItem size: {}, customItem size: {}",basicItem.size(),customItem.size());

        basicItemService.updateStatus(checklist, basicItem);
        customItemService.updateStatus(checklist, customItem);

        Map<String,Integer> response=new HashMap<>();
        response.put("basicItemSize",basicItem.size());
        response.put("customItemSize",customItem.size());
        log.info("[Finished request] PUT /checklist/status/{}",checklistId);
        return response;
    }

    /**
     * 체크리스트 삭제
     */
    @DeleteMapping("/{checklistId}")
    public ChecklistResponseDto deleteChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        log.info("[Starting request] DELETE /checklist/{}",checklistId);

        User user = JwtTokenProvider.getUserFromJwtToken(userService,headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user, checklist);

        checklistService.deleteChecklist(checklistId);

        log.info("[Finished request] DELETE /checklist/{}",checklistId);
        return new ChecklistResponseDto(checklistId);
    }

    /**
     * 해당 유저의 체크리스트인지 확인
     */
    private void checkOwnership(User user, Checklist checklist) {
        if(!checklist.getUser().equals(user)){
            //todo 더 적절한 예외 있으면 바꾸기, 아니면 사용자 예외 만들기
            throw new IllegalArgumentException();
        }
    }

    /**
     * 체크리스트 수정 - 기본 아이템 채우기
     */
    private void fillBasicItem(List<ChecklistBasicItemRequestDto> basicItems, Checklist checklist) {
        basicItemRepo.deleteByChecklist(checklist);

        List<ChecklistBasicItem> basicItemList=new ArrayList<>();
        List<Product> products=productService.productList(basicItems.stream()
                .map(ChecklistBasicItemRequestDto::getProductId).collect(Collectors.toList()));
        for (Product product : products) {
            basicItemList.add(ChecklistBasicItem.of(checklist,product));
        }

        basicItemRepo.saveAll(basicItemList);
    }

    /**
     * 체크리스트 수정 - 커스텀 아이템 채우기
     */
    private void fillCustomItem(List<ChecklistCustomItemRequestDto> customItems, Checklist checklist) {
        customItemRepo.deleteByChecklist(checklist);

        List<ChecklistCustomItem> customItemList=new ArrayList<>();
        for (ChecklistCustomItemRequestDto item : customItems) {
            String name = item.getProductName();
            customItemList.add(ChecklistCustomItem.of(name, checklist));
        }
        customItemRepo.saveAll(customItemList);
    }
}
