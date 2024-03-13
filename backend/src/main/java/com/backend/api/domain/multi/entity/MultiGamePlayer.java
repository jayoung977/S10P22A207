package com.backend.api.domain.multi.entity;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @NotNull
    private Integer ranking = 0;

    @NotNull
    private Double finalRoi;

    @NotNull
    private Integer finalProfit;

    @Builder
    public MultiGamePlayer(MultiGameLog multiGameLog, Member member, Integer ranking, Double finalRoi,
        Integer finalProfit) {
        this.multiGameLog = multiGameLog;
        this.member = member;
        this.ranking = ranking;
        this.finalRoi = finalRoi;
        this.finalProfit = finalProfit;
    }
}
