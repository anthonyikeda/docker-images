FROM debian:jessie

LABEL maintainer='Anthony Ikeda <anthony.ikeda@figure-eight.com>'
LABEL runtime_name='Java'
LABEL runtime_version='10'
LABEL runtime_variant='OpenJDK'

RUN apt-get -y update && apt-get install -y wget

RUN wget --output-document /tmp/openjdk-10_linux-x64_bin.tar.gz \
 https://download.java.net/java/GA/jdk10/10.0.2/19aef61b38124481863b1413dce1855f/13/openjdk-10.0.2_linux-x64_bin.tar.gz

ENV JAVA_HOME /usr/java/jdk-10.0.2
ENV PATH $JAVA_HOME/bin:$PATH

RUN mkdir /usr/java && cd /usr/java && tar xvf /tmp/openjdk-10_linux-x64_bin.tar.gz && rm /tmp/openjdk-10_linux-x64_bin.tar.gz
