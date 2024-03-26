package com.backend.api.domain.notice.entity;

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
        emitter.onCompletion(() -> {
            emitters.get(channelName).remove(emitter);
        });
        emitter.onTimeout(emitter::complete);

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
}