package com.backend.api.domain.multi.entity;

import static lombok.AccessLevel.PROTECTED;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MultiWaitingRoom {
    private List<Long> participantIds;
    private String roomTitle;
    private Integer password;
    private Boolean isOpen;
    private Integer round;


    @Builder
    public MultiWaitingRoom(List<Long> participantIds, String roomTitle, Integer password, Boolean isOpen, Integer round) {
        this.participantIds = participantIds;
        this.roomTitle = roomTitle;
        this.password = password;
        this.isOpen = isOpen;
        this.round = round;
    }
}
