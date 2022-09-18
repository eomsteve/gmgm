FROM gradle:7.5

WORKDIR /var/jenkins_home/workspace/gamulgamul/backend

COPY ./ ./

RUN gradle clean build --no-daemon

CMD ["java", "-jar", "/backend.jar"]