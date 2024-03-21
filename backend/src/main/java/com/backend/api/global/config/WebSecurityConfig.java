package com.backend.api.global.config;

import com.backend.api.global.jwt.JwtAuthenticateFilter;
import com.backend.api.global.jwt.service.JwtService;
import com.backend.api.global.security.handler.CustomOAuth2FailHandler;
import com.backend.api.global.security.handler.CustomOAuth2SuccessHandler;
import com.backend.api.global.security.oauth2.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

	private static final String[] URL_WHITE_LIST = {
		"/actuator","/actuator/**","/error", "/login", "/favicon.ico",
		"/health", "/api-docs/**", "/swagger-ui/**",
		"/swagger-resources/**", "/swagger-ui.html", "/api/token/**",
		"/ws/**", "/api/sub/**", "/api/pub/**"
	};

	private final CustomOAuth2UserService customOAuth2UserService;
	private final CustomOAuth2FailHandler customOAuth2FailHandler;
	private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
	private final JwtService jwtService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.httpBasic(AbstractHttpConfigurer::disable)
			.cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource()))
			.formLogin(AbstractHttpConfigurer::disable)
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			//                 JWT 토큰을 쿠키에 넣을지, LocalStorage에 넣을지에 따라 비활성화 여부 결정
			.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(
				authorize -> authorize.requestMatchers(URL_WHITE_LIST).permitAll().anyRequest().authenticated())
			.oauth2Login(
				oauth2 -> oauth2.userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
					.successHandler(customOAuth2SuccessHandler).failureHandler(customOAuth2FailHandler))
			.addFilterBefore(jwtAuthenticateFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}


	@Bean
	public JwtAuthenticateFilter jwtAuthenticateFilter() {
		return new JwtAuthenticateFilter(jwtService, URL_WHITE_LIST);
	}

	// CORS 설정
	// TODO: Security Filter Chain 설정 시 수정 필요

	CorsConfigurationSource corsConfigurationSource() {
		final List<String> allowedHeaders = List.of("*");
		final List<String> allowedOriginPatterns = List.of(
			"http://localhost:8080",
			"http://localhost:8081",
			"http://localhost:5173",
			"http://localhost:4000",
			"http://localhost:3000",
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

	// @Bean
	// public CorsConfigurationSource corsConfigurationSource() {
	// 	CorsConfiguration config = new CorsConfiguration();
	//
	// 	config.setAllowedOrigins(List.of(
	// 		"http://localhost:3000",
	// 		"http://localhost:4000",
	// 		"http://localhost:8081",
	// 		"https://j10a207.p.ssafy.io")
	// 	);
	// 	config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
	// 	config.setAllowedHeaders(List.of("*"));
	// 	config.setExposedHeaders(List.of("*"));
	// 	config.setAllowCredentials(true);
	// 	// config.setMaxAge(MAX_AGE_SECS);
	//
	// 	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	// 	source.registerCorsConfiguration("/**", config);
	// 	return source;
	// }
}