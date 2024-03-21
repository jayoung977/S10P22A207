package com.backend.api.domain.quiz.repository;

import com.backend.api.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository  extends JpaRepository<Quiz, Long> {
}
