package com.backend.api.domain.notice.repository;

import com.backend.api.domain.notice.entity.Notice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notice, Long> {

    List<Notice> findByMember_Id(Long memberId);
}
