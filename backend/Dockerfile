FROM gradle:7.5

WORKDIR /var/jenkins_home/workspace/gamulgamul/backend

COPY ./ ./

RUN gradle clean build --no-daemon

CMD java -jar ./build/libs/gamulgamul-0.0.1-SNAPSHOT.jar