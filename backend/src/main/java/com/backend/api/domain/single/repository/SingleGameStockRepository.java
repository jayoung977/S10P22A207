package com.backend.api.domain.single.repository;

import com.backend.api.domain.single.entity.SingleGameStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SingleGameStockRepository extends JpaRepository<SingleGameStock, Long> {
    Optional<SingleGameStock> findBySingleGameLog_IdAndStock_Id(Long singleGameLogId, Long stockId);

    Optional<List<SingleGameStock>> findAllBySingleGameLog_Id(Long singleGameLogId);

    Optional<List<SingleGameStock>> findTop3ByStock_IdOrderByRoiDesc(Long id);
}
