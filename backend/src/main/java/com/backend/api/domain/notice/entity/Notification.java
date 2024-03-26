package com.backend.api.domain.notice.entity;


import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.notice.type.AlarmType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "notification")
@NoArgsConstructor(access = PROTECTED)
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private Member member;

    @NotNull
    private String sender;

    @NotNull
    private String content; // 내용

    @NotNull
    private boolean isRead; // 읽었는지 여부

    @Enumerated(EnumType.STRING)
    @NotNull
    private AlarmType alarmType; // 알림의 종류 (예: "게임초대", "공지사항" 등)

    @Builder
    public Notification(Member member, String sender, String content, boolean isRead, AlarmType alarmType) {
        this.member = member;
        this.sender = sender;
        this.content = content;
        this.isRead = isRead;
        this.alarmType = alarmType;
    }
}
