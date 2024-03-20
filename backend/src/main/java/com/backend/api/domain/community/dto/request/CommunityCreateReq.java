package com.backend.api.domain.community.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "커뮤니티 글 생성 request Dto", description = "커뮤니티 글 생성 request Dto")
public record CommunityCreateReq(
        @Schema(description = "글 내용")
        String content
) {
}
