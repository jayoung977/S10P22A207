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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "multi_game_log")
@NoArgsConstructor(access = PROTECTED)
public class MultiGameLog extends BaseEntity {

    @Id
    @Column(name = "multi_game_log_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    private Member member;

    @OneToMany(mappedBy = "multiGameLog")
    private List<MultiTrade> multiTrade = new ArrayList<>();

    @NotNull
    private String gameLogId;

    @NotNull
    private Integer rank = 0;

    @NotNull
    private LocalDateTime startDate;

    @OneToMany(mappedBy = "multiGameLog")
    List<MultiGamePlayer> multiGamePlayers = new ArrayList<>();

    @NotNull
    private Double finalRoi;

    @NotNull
    private Integer finalProfit;

    @Builder
    public MultiGameLog(Member member, List<MultiTrade> multiTrade, String gameLogId, Integer rank, LocalDateTime startDate,
        List<MultiGamePlayer> multiGamePlayers, Double finalRoi, Integer finalProfit) {
        this.member = member;
        this.multiTrade = multiTrade;
        this.gameLogId = gameLogId;
        this.rank = rank;
        this.startDate = startDate;
        this.multiGamePlayers = multiGamePlayers;
        this.finalRoi = finalRoi;
        this.finalProfit = finalProfit;
    }
}
