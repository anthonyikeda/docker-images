FROM debian:jessie

LABEL maintainer="Anthony Ikeda <anthony.ikeda@gmail.com>"

RUN apt-get -y update && apt-get install -y wget

RUN wget --quiet --output-document /tmp/kibana-6.2.2-linux-x86_64.tar.gz \
    https://artifacts.elastic.co/downloads/kibana/kibana-6.2.2-linux-x86_64.tar.gz

RUN cd /opt && tar xvf /tmp/kibana-6.2.2-linux-x86_64.tar.gz && rm /tmp/kibana-6.2.2-linux-x86_64.tar.gz

