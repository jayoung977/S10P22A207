package com.hadoop.api.global.common;

import java.util.List;
import java.util.Objects;

import org.springframework.validation.FieldError;
import com.hadoop.api.global.common.code.ErrorCode;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {
    // @Schema(description = "HTTP 에러 상태")
    private int status;
    // @Schema(description = "Project 에러 코드")
    private String code;
    // @Schema(description = "Project 에러 메시지")
    private String message;
    // @Schema(description = "에러 발생 원인")
    private String reason;
    // @Schema(description = "에러 Field 리스트")
    private List<FieldError> errors;

    @Builder(builderMethodName = "of")
    protected ErrorResponse(final ErrorCode code, final List<FieldError> errors, final String message) {
        Objects.requireNonNull(code);
        this.status = code.getStatus();
        this.code = code.getDivisionCode();
        this.message = code.getMessage();
        // this.errors = Objects.isNull(errors) ? List.of() : errors;
        this.reason = Objects.isNull(message) ? "" : message;
    }
}
