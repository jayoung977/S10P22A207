package com.backend.api.domain.multi.service;

import com.backend.api.domain.multi.dto.MultiGameRoomCreateResponseDto;
import com.backend.api.domain.multi.dto.MultiGameRoomsResponseDto;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MultiGameService {

    private final RedisTemplate<String, Object> redisTemplate;

    /*
     * 멀티게임 key : MultiGame:참가자Id:방번호(소켓):라운드번호
     */
    public List<MultiGameRoomsResponseDto>getMultiGameRooms(int pageNumber, int pageSize) {
        Set<String> multiGameRooms = redisTemplate.keys("multiGame:*");
        if (multiGameRooms == null) {
            return List.of();
        }

        // 방 번호를 기준으로 정렬
        TreeSet<String> sortedRooms = new TreeSet<>(multiGameRooms);

        // 방번호와 게임번호를 기준으로 그룹화
        Map<String, List<Long>> roomGroups = new HashMap<>();
        for (String key : sortedRooms) {
            String[] parts = key.split(":");
            if (parts.length == 4) {
                String participantId = parts[1];
                String roomNumber = parts[2];
                String roundNumber = parts[3];
                String groupKey = roomNumber + ":" + roundNumber;
                roomGroups.computeIfAbsent(groupKey, k -> new ArrayList<>()).add(Long.valueOf(participantId));
            }
        }

        // MultiGameRoomsResponseDto 객체로 변환하여 리스트에 추가
        List<MultiGameRoomsResponseDto> resultList = new ArrayList<>();
        for (Map.Entry<String, List<Long>> entry : roomGroups.entrySet()) {
            String[] parts = entry.getKey().split(":");
            if (parts.length == 2) {
                Long roomNumber = Long.valueOf(parts[0]);
                Integer roundNumber = Integer.valueOf(parts[1]);
                List<Long> participantsIds = entry.getValue();
                resultList.add(new MultiGameRoomsResponseDto(roomNumber, roundNumber, participantsIds));
            }
        }
        // 페이징
        int fromIndex = (pageNumber - 1) * pageSize;
        int toIndex = Math.min(fromIndex + pageSize, resultList.size());
        return resultList.subList(fromIndex, toIndex);
    }

    public void enterMultiGameRoom(Long memberId, String roomId) {
        // TODO: 구독 하게 해야함.
        // TODO: game round 수가 0이 아니라면 못들어가게 해야함
        // 웹소켓에 연결시키는 과정
//        redisTemplate.opsForValue().set("multiGame:" + memberId + ":" + roomId + ":0", );

        // 플레이어를 게임 방의 구독자로 추가
        String channel = "multiGameRoom:" + roomId;
        redisTemplate.opsForSet().add(channel, memberId.toString());
    }

    public MultiGameRoomCreateResponseDto createMultiGameRoom(Long memberId) {

    }
}
