FROM debian:jessie

LABEL maintainer="Anthony Ikeda <anthony.ikeda@gmail.com>"

RUN apt-get -y update && apt-get install -y wget unzip

RUN wget --quiet --output-document /tmp/elasticsearch-6.2.2.zip \
    https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.2.2.zip

RUN unzip -d /opt /tmp/elasticsearch-6.2.2.zip && rm /tmp/elasticsearch-6.2.2.zip

