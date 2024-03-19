package com.backend.api.global.security.handler;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.backend.api.global.common.ErrorResponse;
import com.backend.api.global.common.code.ErrorCode;
import com.google.gson.Gson;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2FailHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of().code(ErrorCode.FAILED_OAUTH2_AUTHENTICATION_EXCEPTION).errors(null)
                .message(null).build();

        Gson gson = new Gson();
        response.getWriter().println(gson.toJson(errorResponse));
    }
}