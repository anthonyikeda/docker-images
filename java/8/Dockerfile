FROM debian:jessie

LABEL maintainer='Anthony Ikeda <anthony.ikeda@crowdflower.com>'

RUN apt-get -y update && apt-get install -y wget
RUN wget --quiet --output-document /tmp/jdk-8u161-linux-x64.tar.gz --header 'Cookie: oraclelicense=accept-securebackup-cookie' \
http://download.oracle.com/otn-pub/java/jdk/8u161-b12/2f38c3b165be4555a1fa6e98c45e0808/jdk-8u161-linux-x64.tar.gz

RUN cd /usr && tar xvf /tmp/jdk-8u161-linux-x64.tar.gz && rm /tmp/jdk-8u161-linux-x64.tar.gz

ENV JAVA_HOME /usr/jdk1.8.0_161
ENV PATH $JAVA_HOME/bin:$PATH
