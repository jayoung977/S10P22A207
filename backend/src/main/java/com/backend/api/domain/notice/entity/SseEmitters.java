package com.backend.api.domain.notice.entity;

import com.backend.api.domain.notice.dto.NotificationRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@Slf4j
public class SseEmitters {
    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    public SseEmitter add(String channelName, SseEmitter emitter) {

        log.info("add 요청");
        if (!emitters.containsKey(channelName)) {
            log.info("add 할 때 list 가 없어서 생성한뒤 추가 channelName : {} ", channelName);
            emitters.put(channelName, new CopyOnWriteArrayList<>());
        }
        emitters.get(channelName).add(emitter);
        // 클라이언트 연결이 끊겨도 리스트에서 emitter를 제거하지 않습니다.
        emitter.onCompletion(() -> {
             emitters.get(channelName).remove(emitter); // 연결이 끊기거나 .complete() 호출시 사용.
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
                log.info("메시지 noti at SseEmitters -> channelName: {}, eventName: {}, roomId : {}", channelName, eventName, data.roomId());
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonData = objectMapper.writeValueAsString(data);
                log.info("noti 요청 왔어요");

                emitter.send(
                    SseEmitter.event()
                        .name(eventName)
                        .data(jsonData)
                );
                log.info("emitter 정보 :{}", emitter.toString());
                log.info("emitter.send 완료 at SseEmitters");
            } catch (ClientAbortException e) {

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
}