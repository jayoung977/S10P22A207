package com.backend.api.domain.notice.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.notice.dto.NotificationRequestDto;
import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.notice.entity.SseEmitters;
import com.backend.api.domain.notice.repository.NotificationRepository;
import com.backend.api.domain.notice.type.AlarmType;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubService implements MessageListener {

    private final NotificationRepository notificationRepository;

    private final MemberRepository memberRepository;
    private final ObjectMapper mapper = new ObjectMapper();
    private final SseEmitters sseEmitters;

    // 메시지가 도착하면 처리
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {

            log.info("메시지 도착 -> RedisSubService");
            // 수신된 메시지를 문자열로 변환
            String jsonMessage = new String(message.getBody());
            //JSON 문자열을 Dto 객체로 변환
            NotificationRequestDto dto = mapper.readValue(jsonMessage, NotificationRequestDto.class);

            // Notice Repository에 저장
            switch (dto.alarmType()){
//                case NOTICE -> {
//                    sendNoticeToAllMembers(dto.content());
//                    sseEmitters.noti("alarm:toAllUser", "newAlarmAdded");
//                }
                case INVITATION -> {
                    sendInviteToMember(dto);
                    sseEmitters.noti("alarm", dto.channelName() + ":INVITATION", dto);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void sendInviteToMember(NotificationRequestDto dto) {
        Member receiver = memberRepository.findById(Long.valueOf(dto.channelName())).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER)
        );

        //TODO: roomId를 그냥 content 에 담아주었는데 나중에는 변경해야할수도
        Notice invitation = Notice.builder()
            .member(receiver)
            .sender(dto.sender())
            .content(String.valueOf(dto.roomId()))
            .isRead(false)
            .alarmType(AlarmType.INVITATION)
            .build();

        notificationRepository.save(invitation);
    }

    public void sendNoticeToAllMembers(String content) {

        log.info("RedisSubService 도달");
        // 모든 유저 정보 조회
        List<Member> allMembers = memberRepository.findAll();

        // 모든 유저에 대한 Notice 객체 생성
        List<Notice> notices = new ArrayList<>();
        for (Member member : allMembers) {
            Notice notice = Notice.builder()
                .member(member)
                .sender("운영자")
                .content(content)
                .isRead(false)
                .alarmType(AlarmType.NOTICE)
                .build();
            notices.add(notice);
        }

        // 생성된 Notice 일괄적으로 데이터베이스에 저장
        notificationRepository.saveAll(notices);
    }
}
