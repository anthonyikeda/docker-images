FROM anthonyikeda/java:9.0.4

LABEL maintainer="Anthony Ikeda <anthony.ikeda@gmail.com>"

RUN ln -s /usr/java/jdk-9.0.4/bin/java /usr/bin/java

RUN apt-get -y update && apt-get install -y wget unzip apt-utils apt-transport-https

RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -

RUN echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-6.x.list
RUN apt-get -y update && apt-get -y install logstash


COPY logstash.conf /opt/logstash/config/logstash.conf

