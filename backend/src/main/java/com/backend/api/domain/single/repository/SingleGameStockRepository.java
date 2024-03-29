package com.backend.api.domain.single.repository;

import com.backend.api.domain.single.entity.SingleGameStock;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SingleGameStockRepository extends JpaRepository<SingleGameStock, Long> {
    Optional<SingleGameStock> findBySingleGameLog_IdAndStock_Id(Long singleGameLogId, Long stockId);
}
