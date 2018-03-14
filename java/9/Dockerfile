FROM debian:jessie

LABEL maintainer='Anthony Ikeda <anthony.ikeda@crowdflower.com>'

RUN apt-get -y update && apt-get install -y wget

RUN wget --quiet --output-document /tmp/openjdk-9.0.4_linux-x64_bin.tar.gz \
 https://download.java.net/java/GA/jdk9/9.0.4/binaries/openjdk-9.0.4_linux-x64_bin.tar.gz

ENV JAVA_HOME /usr/java/jdk-9.0.4
ENV PATH $JAVA_HOME/bin:$PATH

RUN mkdir /usr/java && cd /usr/java && tar xvf /tmp/openjdk-9.0.4_linux-x64_bin.tar.gz && rm /tmp/openjdk-9.0.4_linux-x64_bin.tar.gz
