package com.backend.api.domain.quiz.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;


@Schema(name = "퀴즈 response Dto", description = "퀴즈 관련 response Dto")
public record QuizRes(
        @Schema(description = "퀴즈 id")
        Long id,
        @Schema(description = "질문")
        String title,

        @Schema(description = "선택지")
        List<String> selections,

        @Schema(description = "정답")
        Integer answer

) {}
