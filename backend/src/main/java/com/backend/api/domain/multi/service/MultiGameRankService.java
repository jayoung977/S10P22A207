package com.backend.api.domain.multi.service;

import com.backend.api.domain.multi.entity.MultiGame;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;

public class MultiGameRankService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ZSetOperations<String, Object> zSetOperations;

    public MultiGameRankService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.zSetOperations = redisTemplate.opsForZSet();
    }

    // totalAssetRank:gameId:roundNumber:
    // 사용자의 totalAsset 을 업데이트하고 Redis Sorted Set 을 업데이트하는 메서드
    public void updateUserTotalAsset(long gameId, int roundNumber, Long memberId, long totalAsset) {
        zSetOperations.add("totalAssetRank:" + gameId + ":" + roundNumber, memberId, totalAsset);
    }
    //매수, 매도, 공매도, 공매도청산, 다음날 일때도 update 해줘야 한다.

    // totalAsset 기준으로 순위를 가져오는 메서드 => 매 초 호출한다.
    public List<Long> getUserRanksByTotalAsset(long gameId, int roundNumber) {
        String key = "totalAssetRank:" + gameId + ":" + roundNumber;
        List<Long> userRanks = new ArrayList<>();

        Set<ZSetOperations.TypedTuple<Object>> tuples = zSetOperations.reverseRangeWithScores(key, 0, -1);
        for (ZSetOperations.TypedTuple<Object> tuple : tuples) {
            Long memberId = (Long) tuple.getValue(); // 사용자 ID 가져오기
            userRanks.add(memberId);
        }

        return userRanks;
    }
}
