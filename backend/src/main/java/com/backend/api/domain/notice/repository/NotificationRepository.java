package com.backend.api.domain.notice.repository;

import com.backend.api.domain.notice.entity.Notice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import io.lettuce.core.GeoArgs;

public interface NotificationRepository extends JpaRepository<Notice, Long> {

    List<Notice> findByMember_IdOrderByIdDesc(Long memberId);
    Long countByMember_IdAndIsReadFalse(Long memberId);
}
