package com.backend.api.domain.multi.entity;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "multi_game_player")
@NoArgsConstructor(access = PROTECTED)
public class MultiGamePlayer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "multi_game_player_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private MultiGameLog multiGameLog;

    @NotNull
    private Long memberId;

    @Builder
    public MultiGamePlayer(MultiGameLog multiGameLog, Long memberId) {
        this.multiGameLog = multiGameLog;
        this.memberId = memberId;
    }
}
