package com.backend.api.domain.quiz.controller;

import com.backend.api.domain.quiz.dto.response.QuizRes;
import com.backend.api.domain.quiz.dto.response.QuizeUpdateAssetRes;
import com.backend.api.domain.quiz.service.QuizService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('USER')")
@Tag(name = "퀴즈", description = "퀴즈 관련 API")
public class QuizController {
    private final QuizService quizService;


    @Operation(summary = "퀴즈 랜덤 5개 조회")
    @GetMapping
    public ResponseEntity<BaseResponse<List<QuizRes>>> getQuizList() {
        List<QuizRes> QuizResList = quizService.getQuizList();
        return BaseResponse.success(
                SuccessCode.SELECT_SUCCESS,
                QuizResList
        );
    }
    @Operation(summary = "퀴즈 3/5 맞추고 500만원 이하이면 100만원 부여 ")
    @PutMapping("/update")
    public ResponseEntity<BaseResponse<QuizeUpdateAssetRes>> updateAsset(@AuthenticationPrincipal CustomUserDetails userDetails) {
        QuizeUpdateAssetRes quizeUpdateAssetRes = quizService.updateAsset(userDetails.getId());
        return BaseResponse.success(
                SuccessCode.SELECT_SUCCESS,
                quizeUpdateAssetRes
        );
    }



}
