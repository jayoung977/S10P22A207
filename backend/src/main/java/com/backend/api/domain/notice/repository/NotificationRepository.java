package com.backend.api.domain.notice.repository;

import com.backend.api.domain.notice.entity.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByMember_Id(Long memberId);
}
