package com.backend.api.domain.community.entity;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@Table(name = "community")
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "community_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @Column(length = 200)
    private String content;

    @NotNull
    private Boolean isDelete= false;

    @OneToMany(mappedBy = "community")
    private List<CommunityFile> communityFileList = new ArrayList<>();

    @Builder
    public Community(Long id, Member member, String content, Boolean isDelete, List<CommunityFile> communityFileList) {
        this.id = id;
        this.member = member;
        this.content = content;
        this.isDelete = isDelete;
        this.communityFileList = communityFileList;
    }

    public void updateCommunityDeleteStatus() {
        this.isDelete = true;
    }
}
