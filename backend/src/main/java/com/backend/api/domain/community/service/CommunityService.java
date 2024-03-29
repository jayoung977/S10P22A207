package com.backend.api.domain.community.service;

import com.backend.api.domain.community.dto.request.CommunityCreateReq;
import com.backend.api.domain.community.dto.response.CommunityDetailRes;
import com.backend.api.domain.community.dto.response.CommunityRes;
import com.backend.api.domain.community.entity.Community;
import com.backend.api.domain.community.entity.CommunityFile;
import com.backend.api.domain.community.repository.CommunityFileRepository;
import com.backend.api.domain.community.repository.CommunityRepository;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityService {


    private final MemberRepository memberRepository;
    private final CommunityRepository communityRepository;
    private final CommunityFileRepository communityFileRepository;
    private final AwsS3Service awsS3Service;

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

    @Transactional
    public void createMultiCommunity(Long loginUserId, List<MultipartFile> multipartFile, CommunityCreateReq communityCreateReq) {
        Member member = memberRepository.findById(loginUserId)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
        Community community = Community.builder()
                .member(member)
                .content(communityCreateReq.content())
                .isDelete(false)
                .build();
        Community saved = communityRepository.save(community);

        if(multipartFile != null)
            awsS3Service.uploadFile(saved,multipartFile);


    }

    public List<CommunityRes> getAllCommunities() {
        return communityRepository.findAllByOrderByIdDesc().stream()
                .filter(community -> !community.getIsDelete())
                .map(community -> new CommunityRes(
                        community.getId(),
                        community.getMember().getNickname(),
                        community.getContent(),
                        community.getCommunityFileList().stream().map(
                                communityFile -> awsS3Service.getFilePath(communityFile.getUrl())
                        ).toList()
                ))
                .toList();
    }


    public List<CommunityRes> getMyCommunities(Long loginUserId) {
        return communityRepository.findAllByMember_IdOrderByIdDesc(loginUserId).stream()
                .filter(community -> !community.getIsDelete())
                .map(community -> new CommunityRes(
                        community.getId(),
                        community.getMember().getNickname(),
                        community.getContent(),
                        community.getCommunityFileList().stream().map(
                                communityFile -> awsS3Service.getFilePath(communityFile.getUrl())
                        ).toList()
                ))
                .toList();
    }

    public CommunityDetailRes getCommunityDetail(Long communityId) {
        Community community = communityRepository.findByIdAndIsDelete(communityId,false).orElseThrow(() -> new IllegalArgumentException("해당 글이 존재하지 않습니다."));
        return new CommunityDetailRes(
                community.getId(),
                community.getMember().getNickname(),
                community.getContent(),
                community.getCommunityFileList().stream().map(
                        communityFile -> awsS3Service.getFilePath(communityFile.getUrl())
                ).toList()
        );
    }

    @Transactional
    public void deleteCommunity(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new IllegalArgumentException("해당 글이 존재하지 않습니다."));
        community.updateCommunityDeleteStatus();
        for (CommunityFile communityFile : community.getCommunityFileList()) {
            communityFile.updateCommunityFileDeleteStatus();
        }




    }

}
