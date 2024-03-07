package com.backend.api.domain.quiz.entity;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.quiz.entity.type.QuizType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@Table(name = "quiz")
public class Quiz extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "quiz_id")
    private Long id;

    @NotNull
    @Column(length = 255)
    private String content;

    @NotNull
    @Column(length = 20)
    private String answer;

    @NotNull
    @Column(length = 255)
    private String explanation;


    @NotNull
    @Enumerated(EnumType.STRING)
    private QuizType type;

    @NotNull
    @Column(length = 255)
    private String option1;

    @NotNull
    @Column(length = 255)
    private String option2;

    @Column(length = 255)
    private String option3;

    @Column(length = 255)
    private String option4;

    @Builder
    public Quiz(Long id, String content, String answer, String explanation, QuizType type, String option1, String option2, String option3, String option4) {
        this.id = id;
        this.content = content;
        this.answer = answer;
        this.explanation = explanation;
        this.type = type;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
    }
}
