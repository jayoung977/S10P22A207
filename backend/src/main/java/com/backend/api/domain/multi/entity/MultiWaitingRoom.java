package com.backend.api.domain.multi.entity;

import static lombok.AccessLevel.*;

import java.util.Map;
import java.util.Set;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MultiWaitingRoom {
	private Set<Long> participantIds;
	private String roomTitle;
	private Integer password;
	private Boolean isOpen;
	private Integer round;
	private Map<Long, Boolean> readyState;

	@Builder
	public MultiWaitingRoom(Set<Long> participantIds, String roomTitle, Integer password, Boolean isOpen, Integer round, Map<Long, Boolean> readyState) {
		this.participantIds = participantIds;
		this.roomTitle = roomTitle;
		this.password = password;
		this.isOpen = isOpen;
		this.round = round;
		this.readyState = readyState;
	}

}
