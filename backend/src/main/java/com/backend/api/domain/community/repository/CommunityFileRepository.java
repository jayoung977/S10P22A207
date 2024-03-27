package com.backend.api.domain.community.repository;

import com.backend.api.domain.community.entity.CommunityFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityFileRepository extends JpaRepository<CommunityFile, Long> {
}
