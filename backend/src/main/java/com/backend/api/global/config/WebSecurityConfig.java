package com.backend.api.global.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

	private static final String[] URL_WHITE_LIST = {
		"/error", "/login", "/favicon.ico",
		"/health", "/api-docs/**", "/swagger-ui/**",
		"/swagger-resources/**", "/swagger-ui.html", "/api/token/**",
		"/ws/**", "/api/sub/**", "/api/pub/**"
	};

	// CORS 설정
	// TODO: Security Filter Chain 설정 시 수정 필요
	/*
	CorsConfigurationSource corsConfigurationSource() {
		final List<String> allowedHeaders = List.of("*");
		final List<String> allowedOriginPatterns = List.of(
			"http://localhost:8080",
			"http://localhost:5173",
			"http://localhost:4000",
			"https://j10a207.p.ssafy.io"
		);
		return request -> {
			CorsConfiguration config = new CorsConfiguration();
			config.setAllowedHeaders(allowedHeaders);
			config.setAllowedMethods(Collections.singletonList("*"));
			config.setAllowedOriginPatterns(allowedOriginPatterns); // ⭐️ 허용할 origin
			config.setAllowCredentials(true);
			return config;
		};
	}
	*/
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowedOrigins(List.of(
			"http://localhost:3000",
			"http://localhost:4000",
			"http://localhost:8081",
			"https://j10a207.p.ssafy.io")
		);
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setExposedHeaders(List.of("*"));
		config.setAllowCredentials(true);
		// config.setMaxAge(MAX_AGE_SECS);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}