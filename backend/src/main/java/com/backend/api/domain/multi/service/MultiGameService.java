package com.backend.api.domain.multi.service;

import com.backend.api.domain.multi.dto.multiGameRoomsResponseDto;
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
        멀티게임 key : MultiGame:방번호:게임번호:참가자Id
     */
    public List<multiGameRoomsResponseDto>getMultiGameRooms(int pageNumber, int pageSize) {
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
                String roomNumber = parts[1];
                String gameNumber = parts[2];
                String participantId = parts[3];
                String groupKey = roomNumber + ":" + gameNumber;
                roomGroups.computeIfAbsent(groupKey, k -> new ArrayList<>()).add(Long.valueOf(participantId));
            }
        }

        return
    }
}
