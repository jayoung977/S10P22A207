package com.backend.api.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

	@Bean
	public WebClient webClient() {
		return WebClient.builder()
			.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(-1))
			.baseUrl("http://hadoop-app:8080")
			.build();
	}
}