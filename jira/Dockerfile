FROM anthonyikeda/java:8

LABEL maintainer "Anthony Ikeda"
LABEL maintainer_email "anthony.ikeda@gmail.com"
LABEL jre_version "OpenJDK 8"
LABEL jira_version "8.0.1"

COPY atlassian-jira-software-8.0.1.tar.gz /tmp

WORKDIR /opt
RUN tar -xvf /tmp/atlassian-jira-software-8.0.1.tar.gz

