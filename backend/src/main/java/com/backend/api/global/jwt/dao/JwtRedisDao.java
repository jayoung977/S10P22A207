package com.backend.api.global.jwt.dao;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRedisDao {
    private final StringRedisTemplate redisTemplate;
    private static final String REFRESH_HASH = "refresh-token/";

    public void save(String email, String refreshToken, long expireTime) {
        redisTemplate.opsForValue().set(REFRESH_HASH + email, refreshToken, expireTime, TimeUnit.SECONDS);
    }
    public String get(String email) {
        return redisTemplate.opsForValue().get(REFRESH_HASH + email);
    }
}