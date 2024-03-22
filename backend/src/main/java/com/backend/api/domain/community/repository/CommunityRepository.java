package com.backend.api.domain.community.repository;

import com.backend.api.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    Optional<Community> findByIdAndIsDelete(Long communityId, boolean b);

    List<Community> findAllByOrderByIdDesc();

    List<Community> findAllByMember_IdOrderByIdDesc(Long loginUserId);
}
