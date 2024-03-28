package com.backend.api.domain.notice.controller;

import com.backend.api.domain.notice.entity.SseEmitters;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
@RequestMapping("/api/sse")
@RequiredArgsConstructor
public class SseController {
    private final SseEmitters sseEmitters;

    @GetMapping(value = "/connect/{channelName}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@PathVariable String channelName) {
        SseEmitter emitter = new SseEmitter();
        log.info("구독 요청 - SseController {}", channelName);
        sseEmitters.add(channelName, emitter);
        try {
            emitter.send(SseEmitter.event()
                .name("connect")
                .data("connected!"));

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(emitter);
    }
}