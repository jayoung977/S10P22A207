FROM gradle:8.5-jdk AS build
COPY src ./src
COPY build.gradle settings.gradle  ./

RUN gradle clean build -x test

FROM openjdk:8

COPY --from=build /home/gradle/build/libs/hadoop-app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080

#RUN apt-get update
#RUN apt-get -y install python
#RUN apt-get -y install pip
#RUN pip install pykrx
#RUN pip install pandas
#RUN pip install pyspark

CMD ["java", "-jar", "app.jar"]