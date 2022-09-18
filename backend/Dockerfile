FROM gradle:7.5

WORKDIR /var/jenkins_home/workspace/s07-bigdata-dist-sub2/S07P22D108/backend

COPY ./ ./

RUN gradle clean build

CMD java -jar ./build/libs/*jar