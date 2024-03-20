package com.backend.api.global.config;

import com.backend.api.domain.notice.service.RedisSubService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(ObjectMapper objectMapper) {
        GenericJackson2JsonRedisSerializer serializer =
            new GenericJackson2JsonRedisSerializer(objectMapper);

        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        // json 형식으로 데이터를 받을 때
        // 값이 깨지지 않도록 직렬화한다.
        // 저장할 클래스가 여러개일 경우 범용 JacksonSerializer인 GenericJackson2JsonRedisSerializer를 이용한다
        // 참고 https://somoly.tistory.com/134
        // setKeySerializer, setValueSerializer 설정해주는 이유는 RedisTemplate를 사용할 때 Spring - Redis 간 데이터 직렬화, 역직렬화 시 사용하는 방식이 Jdk 직렬화 방식이기 때문입니다.
        // 동작에는 문제가 없지만 redis-cli을 통해 직접 데이터를 보려고 할 때 알아볼 수 없는 형태로 출력되기 때문에 적용한 설정입니다.
        // 참고 https://wildeveloperetrain.tistory.com/32
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(serializer);
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(serializer);
        redisTemplate.setEnableTransactionSupport(true); // transaction 허용

        return redisTemplate;
    }


    /* Pub/sub 사용하여 Redis 채널에서 발생하는 메시지를 저장, 그 메시지에 대한 처리하는 클래스
     * 1. Redis와 연결관리.
     * 2. 메시지 수신, subscriber 등록
     * 3. 비동기 처리
     * 4. 스레드풀관리
     * 5. 라이프 사이클 관리
     */
    @Bean
    RedisMessageListenerContainer redisContainer(){
        final RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory());
        container.addMessageListener(messageListenerAdapter(), topic());
        return container;
    }

    @Bean
    MessageListener messageListenerAdapter() {
        return new MessageListenerAdapter(new RedisSubService());
    }

    @Bean
    ChannelTopic topic(){
        return new ChannelTopic("topic1");
    }

    /*
     * Class <=> Json간 변환을 담당한다.
     *
     * json => object 변환시 readValue(File file, T.class) => json File을 읽어 T 클래스로 변환 readValue(Url url,
     * T.class) => url로 접속하여 데이터를 읽어와 T 클래스로 변환 readValue(String string, T.class) => string형식의
     * json데이터를 T 클래스로 변환
     *
     * object => json 변환시 writeValue(File file, T object) => object를 json file로 변환하여 저장
     * writeValueAsBytes(T object) => byte[] 형태로 object를 저장 writeValueAsString(T object) => string 형태로
     * object를 json형태로 저장
     *
     * json을 포매팅(개행 및 정렬) writerWithDefaultPrettyPrint().writeValueAs... 를 사용하면 json파일이 포맷팅하여 저장된다.
     * object mapper로 date값 변환시 timestamp형식이 아니라 JavaTimeModule() 로 변환하여 저장한다.
     */

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
        return mapper;
    }
}