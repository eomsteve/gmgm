package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.CategoryDto;
import com.lemonmul.gamulgamul.api.dto.checklist.*;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.ChecklistBasicItemRepo;
import com.lemonmul.gamulgamul.repo.ChecklistCustomItemRepo;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.CategoryService;
import com.lemonmul.gamulgamul.service.ChecklistService;
import com.lemonmul.gamulgamul.service.ProductService;
import com.lemonmul.gamulgamul.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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

    /**
     * 체크리스트 리스트 조회
     */
    // TODO: 들어올 때 user pk, 나갈 때 list 개수 log
    @GetMapping("/list")
    public List<ChecklistListDto> checklistList(@RequestHeader HttpHeaders headers){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        List<Checklist> checklists = checklistService.checklistList(user);
        return checklists.stream().map(ChecklistListDto::new).collect(Collectors.toList());
    }

    /**
     * 빈 체크리스트 생성
     */
    // TODO: 들어올 때 user pk, 나갈 때 check list pk log
    @PostMapping()
    public ChecklistResponseDto createChecklist(@RequestHeader HttpHeaders headers){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        return new ChecklistResponseDto(checklistService.createChecklist(user));
    }

    /**
     * 체크리스트 품목 선택 페이지
     */
    // TODO: 들어올 때 list 개수 log
    @GetMapping("/select")
    public List<CategoryDto> checklistProductSelect(){
        return categoryService.getAllCategories().stream().map(CategoryDto::new).collect(Collectors.toList());
    }

    /**
     * 체크리스트 수정
     */
    // TODO: 들어올 때 user pk, checklist pk , 나갈 때 list 개수 log (basic, custom 나눠서)
    @PutMapping("/{checklistId}")
    public ChecklistResponseDto modifyChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId,
                                                @RequestBody ChecklistRequestDto checklistRequestDto){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        fillBasicItem(checklistRequestDto.getChecklistBasicItem(), checklist);
        fillCustomItem(checklistRequestDto.getChecklistCustomItem(), checklist);

        return new ChecklistResponseDto(checklistId);
    }

    /**
     * 체크리스트 조회
     */
    // TODO: 들어올 때 user pk, checklist pk, 나갈 때 checklist 개수 log
    @GetMapping("/{checklistId}")
    public ChecklistDto checklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        return new ChecklistDto(checklist);
    }

    /**
     * 체크리스트 삭제
     */
    // TODO: 들어올 때 user pk, checklist pk, 나갈 때 '요청 종료' log
    @DeleteMapping("/{checklistId}")
    public ChecklistResponseDto deleteChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        User user = JwtTokenProvider.getUserFromJwtToken(userService,headers);
        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user, checklist);

        checklistService.deleteChecklist(checklistId);
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
        for (ChecklistBasicItemRequestDto item : basicItems) {
            Product product = productService.product(item.getProductId());
            basicItemList.add(ChecklistBasicItem.of(checklist, product));
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
