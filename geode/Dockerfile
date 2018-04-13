FROM anthonyikeda/java:8

LABEL maintainer='Anthony Ikeda <anthony.ikeda@gmail.com>'
LABEL application_name='Geode'
LABEL application_version='1.5.0'

RUN wget --quiet --output-document /tmp/apache-geode-1.5.0.tgz \
   http://apache.mirrors.tds.net/geode/1.5.0/apache-geode-1.5.0.tgz

ENV GEODE_HOME /usr/geode/apache-geode-1.5.0
ENV PATH $GEODE_HOME/bin:$PATH

RUN mkdir /usr/geode && cd /usr/geode && tar zxvf /tmp/apache-geode-1.5.0.tgz && rm /tmp/apache-geode-1.5.0.tgz
