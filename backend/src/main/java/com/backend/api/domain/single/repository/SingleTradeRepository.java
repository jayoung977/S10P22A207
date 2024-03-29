package com.backend.api.domain.single.repository;

import com.backend.api.domain.single.entity.SingleTrade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SingleTradeRepository extends JpaRepository<SingleTrade, Long> {

    List<SingleTrade> findAllBySingleGameStock_Id(Long id);
}
