FROM debian:jessie 

LABEL maintainer_name Anthony Ikeda 
LABEL maintainer_email anthony.ikeda@gmail.com
LABEL runtime_name Java
LABEL runtime_version 1.8.0_202
LABEL runtime_variant Oracle

RUN apt-get -y update && apt-get install -y wget

RUN wget --quiet --output-document /tmp/jdk-8u202-linux-x64.tar.gz --header 'Cookie: oraclelicense=accept-securebackup-cookie' \
    https://download.oracle.com/otn-pub/java/jdk/8u202-b08/1961070e4c9b4e26a04e7f5a083f551e/jdk-8u202-linux-x64.tar.gz 

RUN cd /usr && tar xvf /tmp/jdk-8u202-linux-x64.tar.gz && rm /tmp/jdk-8u202-linux-x64.tar.gz

ENV JAVA_HOME /usr/jdk1.8.0_202
ENV PATH $JAVA_HOME/bin:$PATH
