package com.backend.api.domain.notice.entity;

import com.backend.api.domain.notice.dto.NotificationRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@Slf4j
public class SseEmitters {
    private final HashMap<String, List<SseEmitter>> emitters = new HashMap<>();

    public SseEmitter add(String channelName, SseEmitter emitter) {
        if (!emitters.containsKey(channelName)) {
            emitters.put(channelName, new CopyOnWriteArrayList<>());
        }
        emitters.get(channelName).add(emitter);
        // 클라이언트 연결이 끊겨도 리스트에서 emitter를 제거하지 않습니다.
        emitter.onCompletion(() -> {
        });
        emitter.onTimeout(() -> {
            // 타임아웃 발생 시 완료 처리 대신에 다시 연결을 시도.
            try {
                emitter.send(SseEmitter.event().name("timeout").data("Connection timed out"));
            } catch (IOException e) {
                // IOException 처리
            }
        });


        return emitter;
    }

    public void noti(String channelName, String eventName) {
        noti(channelName, eventName, MappingUtils.mapOf());
    }

    public void noti(String channelName, String eventName, Map<String, Object> data) {
        emitters.get(channelName).forEach(emitter -> {
            try {
                emitter.send(
                    SseEmitter.event()
                        .name(eventName)
                        .data(data)
                );
            } catch (ClientAbortException e) {

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public void noti(String channelName, String eventName, NotificationRequestDto data) {
        emitters.get(channelName).forEach(emitter -> {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonData = objectMapper.writeValueAsString(data);
                emitter.send(
                    SseEmitter.event()
                        .name(eventName)
                        .data(jsonData)
                );
            } catch (ClientAbortException e) {

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
}