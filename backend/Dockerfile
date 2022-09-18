FROM gradle:7.5

WORKDIR /var/jenkins_home/workspace/gamulgamul/backend

COPY ./ ./

RUN gradle clean build --no-daemon


FROM openjdk:17-jdk

WORKDIR /var/jenkins_home/workspace/gamulgamul/backend

COPY ./build/libs/gamulgamul-0.0.1-SNAPSHOT.jar backend.jar

ENTRYPOINT ["java", "-jar", "/backend.jar"]