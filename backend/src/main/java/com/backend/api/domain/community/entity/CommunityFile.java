package com.backend.api.domain.community.entity;

import com.backend.api.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@Table(name = "community_file")
public class CommunityFile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "community_file_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "community_id")
    private Community community;

    @NotNull
    @Column(length = 255)
    private String url;

    @NotNull
    private Boolean isDelete= false;

    @Builder
    public CommunityFile(Long id, Community community, String url, Boolean isDelete) {
        this.id = id;
        this.community = community;
        this.url = url;
        this.isDelete = isDelete;
    }
}
