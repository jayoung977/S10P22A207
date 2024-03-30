FROM gradle:8.5-jdk AS build
COPY src ./src
COPY build.gradle settings.gradle  ./

RUN gradle clean build -x test

FROM openjdk:8

COPY --from=build /home/gradle/build/libs/hadoop-app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]