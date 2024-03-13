package com.backend.api.domain.fund.dto.response;

public record FundMemberRes(
	Long memberId,
	String nickname,
	Long investmentAmount
) {
}
