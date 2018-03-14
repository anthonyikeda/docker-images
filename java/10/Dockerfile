FROM debian:jessie

LABEL maintainer='Anthony Ikeda <anthony.ikeda@crowdflower.com>'

RUN apt-get -y update && apt-get install -y wget

RUN wget --quiet --output-document /tmp/openjdk-10+46_linux-x64_bin.tar.gz \
 https://download.java.net/java/jdk10/archive/46/GPL/openjdk-10+46_linux-x64_bin.tar.gz

ENV JAVA_HOME /usr/java/jdk-10
ENV PATH $JAVA_HOME/bin:$PATH

RUN mkdir /usr/java && cd /usr/java && tar xvf /tmp/openjdk-10+46_linux-x64_bin.tar.gz && rm /tmp/openjdk-10+46_linux-x64_bin.tar.gz
