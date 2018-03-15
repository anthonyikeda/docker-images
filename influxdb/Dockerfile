FROM debian:jessie

LABEL maintainer="Anthony Ikeda <anthony.ikeda@gmail.com>"

COPY install.sh /tmp/setup.sh
COPY createdbs.sh /tmp/createdbs.sh
COPY databases.txt /tmp/databases.txt

RUN chmod u+x /tmp/setup.sh
RUN chmod u+x /tmp/createdbs.sh

RUN apt-get update -y; apt-get install -y curl
RUN /tmp/setup.sh
RUN apt-get update -y && apt-get install -y influxdb

