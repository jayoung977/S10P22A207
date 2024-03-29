package com.backend.api.domain.quiz.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.quiz.dto.response.QuizRes;
import com.backend.api.domain.quiz.dto.response.QuizeUpdateAssetRes;
import com.backend.api.domain.quiz.entity.Quiz;
import com.backend.api.domain.quiz.repository.QuizRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizService {

    private final QuizRepository quizRepository;
    private final MemberRepository memberRepository;

    public List<QuizRes> getQuizList() {
        List<Quiz> quizList = quizRepository.findAll();
        Random random = new Random();
        int[] indices = IntStream.range(0, quizList.size()).toArray();
        List<Quiz> randomList = new ArrayList<>();

        int limit = 5;
        for (int i = 0; i < limit; ++i) {
            int randomIndex = random.nextInt(quizList.size() - i);
            randomList.add(quizList.get(indices[randomIndex]));
            indices[randomIndex] = indices[quizList.size() - 1 - i];
            // random에서 선택한 index를 마지막 인덱스와 교환해줌으로써 중복을 해결하고 random bound가 줄어들면서 생성하기 때문에 충돌할 우려도 없다.
        }
        return randomList.stream().map(
                quiz -> {
                    ArrayList<String> selections = new ArrayList<>();
                    selections.add(quiz.getOption1());
                    selections.add(quiz.getOption2());
                    selections.add(quiz.getOption3());
                    selections.add(quiz.getOption4());
                    return new QuizRes(
                        quiz.getId(),
                        quiz.getContent(),
                        selections,
                        quiz.getAnswer()
                    );
                }
        ).toList();


    }
    @Transactional
    public QuizeUpdateAssetRes updateAsset(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));

        log.info("[QuizeUpdateAsset] member.getAsset(): "+ member.getAsset());
        QuizeUpdateAssetRes res;
        if (member.getAsset() > 5_000_000L) {
            res = new QuizeUpdateAssetRes(false, member.getAsset());
            return res;
        }
        member.updateAsset(member.getAsset() + 1_000_000L);
        res = new QuizeUpdateAssetRes(true, member.getAsset());
        return res;

    }
}
