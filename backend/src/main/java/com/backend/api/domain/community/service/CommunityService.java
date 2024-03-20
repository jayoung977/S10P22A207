package com.backend.api.domain.community.service;

import com.backend.api.domain.community.dto.request.CommunityCreateReq;
import com.backend.api.domain.community.dto.response.CommunityDetailRes;
import com.backend.api.domain.community.dto.response.CommunityRes;
import com.backend.api.domain.community.entity.Community;
import com.backend.api.domain.community.repository.CommunityRepository;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityService {


    private final MemberRepository memberRepository;
    private final CommunityRepository communityRepository;

    //파일 업로드 S3 연결 필요
    @Transactional
    public void createCommunity(Long loginUserId, CommunityCreateReq communityCreateReq) {
        Member member = memberRepository.findById(loginUserId)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
        Community community = Community.builder()
                .member(member)
                .content(communityCreateReq.content())
                .isDelete(false)
                .build();
        communityRepository.save(community);
    }


    public List<CommunityRes> getAllCommunities() {
        return communityRepository.findAll().stream()
                .filter(community -> !community.getIsDelete())
                .map(community -> new CommunityRes(
                        community.getId(),
                        community.getMember().getNickname(),
                        community.getContent()
                        //TODO: 사진 파일 리스트
                ))
                .toList();
    }


    public List<CommunityRes> getMyCommunities(Long loginUserId) {
        return communityRepository.findAllByMember_Id(loginUserId).stream()
                .filter(community -> !community.getIsDelete())
                .map(community -> new CommunityRes(
                        community.getId(),
                        community.getMember().getNickname(),
                        community.getContent()
                        //TODO: 사진 파일 리스트
                ))
                .toList();
    }

    public CommunityDetailRes getCommunityDetail(Long communityId) {
        Community community = communityRepository.findByIdAndIsDelete(communityId,false).orElseThrow(() -> new IllegalArgumentException("해당 글이 존재하지 않습니다."));
        return new CommunityDetailRes(
                community.getId(),
                community.getMember().getNickname(),
                community.getContent()
                //TODO: 사진 파일 리스트
        );
    }

    @Transactional
    public void deleteCommunity(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new IllegalArgumentException("해당 글이 존재하지 않습니다."));
        community.updateCommunityDeleteStatus();

    }
}
