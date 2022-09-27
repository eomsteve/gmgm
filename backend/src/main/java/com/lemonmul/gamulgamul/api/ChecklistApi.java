package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.CategoryDto;
import com.lemonmul.gamulgamul.api.dto.checklist.*;
import com.lemonmul.gamulgamul.entity.Category;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider.getUserFromJwtToken;

@RestController
@RequestMapping("/checklist")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class ChecklistApi {

    private final ChecklistService checklistService;
    private final UserService userService;
    private final CategoryService categoryService;
    private final ChecklistBasicItemService basicItemService;
    private final ChecklistCustomItemService customItemService;

    /**
     * 체크리스트 리스트 조회
     */
    @GetMapping("/list")
    public List<ListDto> checklistList(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /checklist/list");

        User user = getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        List<Checklist> checklists = checklistService.checklistList(user);
        log.info("checklists size: {}",checklists.size());

        log.info("[Finished request] GET /checklist/list");
        return checklists.stream().map(ListDto::new).collect(Collectors.toList());
    }

    /**
     * 빈 체크리스트 생성
     */
    @PostMapping()
    public ResponseDto createChecklist(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] POST /checklist");

        User user = getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Long checklistId = checklistService.createChecklist(user);
        log.info("checklistId: {}",checklistId);

        log.info("[Finished request] POST /checklist");
        return new ResponseDto(checklistId);
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
     * 체크리스트 조회
     */
    @GetMapping("/{checklistId}")
    public ChecklistDto checklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        log.info("[Starting request] GET /checklist/{}",checklistId);

        User user = getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        int checklistSize = checklist.getChecklistBasicItems().size() + checklist.getChecklistCustomItems().size();
        log.info("checklist size: {}", checklistSize);

        checkOwnership(user,checklist);

        log.info("[Finished request] GET /checklist/{}",checklistId);
        return new ChecklistDto(checklist);
    }

    /**
     * 체크리스트 수정
     */
    @PutMapping("/{checklistId}")
    public Object modifyChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId,
                                        @RequestBody @Valid RequestDto requestDto, BindingResult bindingResult){
        log.info("[Starting request] PUT /checklist/{}",checklistId);

        if(bindingResult.hasErrors()){
            log.info("validation error: {}",bindingResult);
            return new ErrorResponseDto(requestDto,bindingResult);
        }

        User user = getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        List<BasicItemDto> basicItem = requestDto.getChecklistBasicItems();
        List<CustomItemDto> customItem = requestDto.getChecklistCustomItems();
        log.info("basicItem size: {}, customItem size: {}",basicItem.size(),customItem.size());

        basicItemService.updateItems(checklist, basicItem);
        customItemService.updateItems(checklist, customItem);

        Checklist updatedChecklist = checklistService.checklist(checklistId);
        int basicItemSize = updatedChecklist.getChecklistBasicItems().size();
        int customItemSize = updatedChecklist.getChecklistCustomItems().size();
        log.info("(updated) basicItem size: {}, customItem size: {}", basicItemSize, customItemSize);

        log.info("[Finished request] PUT /checklist/{}",checklistId);
        return new ChecklistDto(updatedChecklist);
    }

    /**
     * 체크리스트 체크 여부 수정
     */
    @PutMapping("/status/{checklistId}")
    public StatusResponseDto checklistStatus(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId,
                                             @RequestBody ChecklistDto checklistDto){
        log.info("[Starting request] PUT /checklist/status/{}",checklistId);

        User user = getUserFromJwtToken(userService, headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        List<BasicItemDto> basicItem = checklistDto.getChecklistBasicItems();
        List<CustomItemDto> customItem = checklistDto.getChecklistCustomItems();
        log.info("basicItem size: {}, customItem size: {}",basicItem.size(),customItem.size());

        basicItemService.updateStatus(checklist, basicItem);
        customItemService.updateStatus(checklist, customItem);

        log.info("[Finished request] PUT /checklist/status/{}",checklistId);
        return new StatusResponseDto(basicItem,customItem);
    }

    /**
     * 체크리스트 삭제
     */
    @DeleteMapping("/{checklistId}")
    public ResponseDto deleteChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        log.info("[Starting request] DELETE /checklist/{}",checklistId);

        User user = getUserFromJwtToken(userService,headers);
        log.info("userId: {}",user.getId());

        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user, checklist);

        checklistService.deleteChecklist(checklistId);

        log.info("[Finished request] DELETE /checklist/{}",checklistId);
        return new ResponseDto(checklistId);
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


}
