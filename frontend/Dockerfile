# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:20 as builder
# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app
#환경변수 REACT_APP_ALLOW를 'ALLOW'로 설정
ENV REACT_APP_ALLOW ALLOW
# 컨테이너 내부로 package.json 파일들을 복사
COPY package*.json ./
#package-lock.json에 명시된 정확한 버전의 패키지들을 설치
RUN npm ci
#현재 호스트의 모든 파일들을 작업 디렉토리로 복사
COPY . .
#작업 디렉토리의 파일들을 나열하고 그 권한을 확인
RUN ls -al
#React 애플리케이션을 빌드
RUN npm run build

#최신 버전의 Nginx 이미지를 기반으로 새 Docker 이미지를 만듦
FROM nginx:latest
#작업 디렉토리를 '/usr/share/nginx/statics'로 설정
WORKDIR /usr/share/nginx/statics
#기본 Nginx 설정 파일을 제거(custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf
#호스트의 'nginx.conf' 파일을 Nginx 설정 디렉토리로 복사
COPY ./nginx.conf /etc/nginx/conf.d
#'builder' 이미지의 '/app/build' 디렉토리를 작업 디렉토리로 복사
COPY --from=builder /app/.next ./
# Nginx에 /usr/share/nginx/statics 디렉토리에 대한 권한 부여
RUN chgrp -R 0 /usr/share/nginx/statics && \
    chmod -R g+rwX /usr/share/nginx/statics
#EXPOSE 80 - 컨테이너의 80 포트를 포트를 개방
EXPOSE 80
#Nginx 서버를 백그라운드로 동작
CMD ["nginx", "-g", "daemon off;"]
