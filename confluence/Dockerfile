FROM anthonyikeda/java:8

LABEL maintainer "Anthony Ikeda"
LABEL maintainer_email "anthony.ikeda@gmail.com"
LABEL jre_version "OpenJDK 8"
LABEL confluence_version "6.25.2"

COPY atlassian-confluence-6.15.2.tar.gz /tmp

WORKDIR /opt
RUN tar -xvf /tmp/atlassian-confluence-6.15.2.tar.gz && ln -sn /opt/atlassian-confluence-6.15.2 /opt/confluence

WORKDIR /opt/confluence

EXPOSE 8090


