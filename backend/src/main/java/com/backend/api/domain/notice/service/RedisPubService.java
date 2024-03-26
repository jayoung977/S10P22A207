package com.backend.api.domain.notice.service;

import com.backend.api.domain.notice.dto.NotificationRequestDto;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPubService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisMessageListenerContainer container;
    private final RedisSubService subscriber;

    // 채널 구독
    public void subscribe(String channel) {
        container.addMessageListener(subscriber, ChannelTopic.of(channel));
    }

    // 구독 삭제
    public void removeSubscribe(String channel) {
        container.removeMessageListener(subscriber, ChannelTopic.of(channel));
    }

    public void sendMessage(NotificationRequestDto dto) {
        switch (dto.alarmType()){
            case NOTICE -> redisTemplate.convertAndSend("alarm:toAllUser", dto);
            case INVITATION -> redisTemplate.convertAndSend("alarm:member:" + dto.channelName(), dto);
        }
    }

    // 로그인 상태를 관리하기 위해 TTL을 도입(10분)
    public void setLoginStatus(Long memberId) {
        redisTemplate.opsForValue().set("loginMember:" + memberId, "true", 15000, TimeUnit.MILLISECONDS);
    }

    // 로그인 상태 확인
    public boolean isUserLoggedIn(String userId) {
        // 로그인 상태를 확인하고 없으면 false 반환
        return Boolean.TRUE.equals(redisTemplate.hasKey("login:" + userId));
    }

}