package com.backend.api.domain.community.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "커뮤니티 response Dto", description = "커뮤니티 관련 response Dto")
public record CommunityRes(

        @Schema(description = "커뮤니티 id")
        Long id,
        @Schema(description = "작성자 닉네임")
        String nickname,
        @Schema(description = "자산")
        Long asset, 
        @Schema(description = "글 내용")
        String content,

        @Schema(description = "사진 파일 리스트")
        List<String> communityFileList

) {
}
