package com.backend.api;

import jakarta.annotation.PostConstruct;
import java.util.Date;
import java.util.TimeZone;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);


	}

	@PostConstruct
	public void setTimezone() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		log.info("서버 시작 시간: " + new Date());
	}


	@Controller
	static class FaviconController {
		@GetMapping("/favicon.ico")
		@ResponseBody
		public void returnNoFavicon() {
			log.trace("favicon check");
		}
	}

	// Health Checking Controller
	@RestController
	static class HealthController {
		@GetMapping("/health")
		public String healthCheck() {
			return "health OK";
		}
	}
}
