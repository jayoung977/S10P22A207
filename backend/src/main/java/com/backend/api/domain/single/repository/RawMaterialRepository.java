package com.backend.api.domain.single.repository;

import com.backend.api.domain.single.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RawMaterialRepository extends JpaRepository<RawMaterial,Long> {
    List<RawMaterial> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
