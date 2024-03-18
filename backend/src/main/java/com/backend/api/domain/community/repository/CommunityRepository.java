package com.backend.api.domain.community.repository;

import com.backend.api.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    List<Community> findAllByMember_Id(Long loginUserId);


    Optional<Community> findByIdAndIsDelete(Long communityId, boolean b);
}
