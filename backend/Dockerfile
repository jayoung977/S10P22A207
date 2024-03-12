FROM amazoncorretto:17
# 인자 설정 - JAR_File
ARG JAR_FILE=./build/libs/backend-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]