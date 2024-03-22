package com.backend.api.domain.community.controller;

import com.backend.api.domain.community.dto.request.CommunityCreateReq;
import com.backend.api.domain.community.dto.response.CommunityDetailRes;
import com.backend.api.domain.community.dto.response.CommunityRes;
import com.backend.api.domain.community.service.CommunityService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
@Tag(name = "커뮤니티", description = "커뮤니티 관련 API")
public class CommunityController {
    private final CommunityService communityService;

    @Operation(summary = "커뮤니티 글 등록")
    @PostMapping("/write")
    public ResponseEntity<BaseResponse<String>> createCommunity(Long loginUserId,
                                                           @Valid @NotNull @RequestBody CommunityCreateReq communityCreateReq) {
        communityService.createCommunity(loginUserId, communityCreateReq);
        return BaseResponse.success(
                SuccessCode.CREATE_SUCCESS,
                "커뮤니티 글 등록 성공"
        );
    }

    @Operation(summary = "커뮤니티 전체 글 목록 조회")
    @GetMapping("/all")
    public ResponseEntity<BaseResponse<List<CommunityRes>>> getAllCommunities() {
        List<CommunityRes> CommunityResList = communityService.getAllCommunities();
        return BaseResponse.success(
                SuccessCode.SELECT_SUCCESS,
                CommunityResList
        );
    }

    @Operation(summary = "내가 쓴 글 목록 조회")
    @GetMapping("/mylist")
    public ResponseEntity<BaseResponse<List<CommunityRes>>> getMyCommunities(Long loginUserId) {
        List<CommunityRes> CommunityResList = communityService.getMyCommunities(loginUserId);
        return BaseResponse.success(
                SuccessCode.SELECT_SUCCESS,
                CommunityResList
        );
    }

    @Operation(summary = "글 상세 조회")
    @GetMapping
    public ResponseEntity<BaseResponse<CommunityDetailRes>> getCommunityDetail(Long communityId) {
        CommunityDetailRes communityDetailRes = communityService.getCommunityDetail(communityId);
        return BaseResponse.success(
                SuccessCode.SELECT_SUCCESS,
                communityDetailRes
        );
    }

    @Operation(summary = "글 삭제")
    @DeleteMapping
    public ResponseEntity<BaseResponse<String>> deleteCommunity(Long communityId) {
        communityService.deleteCommunity(communityId);
        return BaseResponse.success(
                SuccessCode.DELETE_SUCCESS,
                "커뮤니티 글 삭제 성공"
        );
    }

}
