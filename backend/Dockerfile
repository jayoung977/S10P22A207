#FROM amazoncorretto:17
## 인자 설정 - JAR_File
#ARG JAR_FILE=./build/libs/backend-0.0.1-SNAPSHOT.jar
#ADD ${JAR_FILE} app.jar
#ENTRYPOINT ["java", "-jar", "app.jar"]

FROM gradle:8.5-jdk AS build
COPY src ./src
COPY build.gradle settings.gradle  ./

RUN gradle clean build -x test

FROM amazoncorretto:17 AS run
COPY --from=build /home/gradle/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080


CMD ["java", "-jar", "app.jar"]