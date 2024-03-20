package com.backend.api.domain.single.entity;

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
@Table(name = "single_game_log")
@NoArgsConstructor(access = PROTECTED)
public class SingleGameLog extends BaseEntity {

    @Id
    @Column(name = "single_game_log_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    private Member member;

    @NotNull
    private LocalDateTime startDate; // 게임 시작 날짜

    @NotNull
    private Long initialAsset; // 게임 시작전 시드머니

    @OneToMany(mappedBy = "singleGameLog")
    List<SingleGameStock> singleGameStock = new ArrayList<>();

    @NotNull
    private Double finalRoi;

    @NotNull
    private Long finalProfit;

    @Builder
    public SingleGameLog(Member member, LocalDateTime startDate, Long initialAsset, List<SingleGameStock> singleGameStock, Double finalRoi, Long finalProfit) {
        this.member = member;
        this.startDate = startDate;
        this.initialAsset = initialAsset;
        this.singleGameStock = singleGameStock;
        this.finalRoi = finalRoi;
        this.finalProfit = finalProfit;
    }

    public void updateFinalProfit(long resultProfit) {
        this.finalProfit = resultProfit;
    }

    public void updateFinalRoi(double resultRoi) {
        this.finalRoi = resultRoi;
    }
}
