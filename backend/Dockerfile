FROM gradle:7.5

WORKDIR /var/jenkins_home/workspace/gamulgamul/backend

COPY ./ ./

RUN gradle clean build

CMD java -jar ./build/libs/*jar