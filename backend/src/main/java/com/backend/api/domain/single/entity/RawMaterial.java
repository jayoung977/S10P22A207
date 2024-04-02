package com.backend.api.domain.single.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@Table(name = "raw_material")
public class RawMaterial {
    @Id
    @Column(name = "raw_material_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private LocalDate date;

    @Column(length = 255)
    private String wti;

    @Column(length = 255)
    private String copper;

    @Column(length = 255)
    private String gold;

    @Column(length = 255)
    private String wheat;

    @Column(length = 255)
    private String silver;


    @Column(length = 255)
    private String gas;


}
