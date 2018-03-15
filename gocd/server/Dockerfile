FROM debian:jessie

RUN echo "deb http://http.debian.net/debian jessie-backports main" | tee -a "/etc/apt/sources.list"

RUN apt-get -y update && apt-get -y install wget unzip git-all

RUN apt-get install -y -t jessie-backports openjdk-8-jdk

RUN wget --quiet --output-document /tmp/go-server.zip \
    https://download.gocd.org/binaries/18.2.0-6228/generic/go-server-18.2.0-6228.zip

RUN unzip -d /opt /tmp/go-server.zip && mkdir -p /opt/go-server-18.2.0/plugins/external

RUN wget --quiet --output-document /opt/go-server-18.2.0/plugins/external/github-oauth-authorization-plugin-2.1.0-15.jar \
    https://github.com/gocd-contrib/github-oauth-authorization-plugin/releases/download/2.1.0/github-oauth-authorization-plugin-2.1.0-15.jar

RUN wget --quiet --output-document /opt/go-server-18.2.0/plugins/external/gocd-slack-task-1.3.1.jar \
    https://github.com/Vincit/gocd-slack-task/releases/download/v1.3.1/gocd-slack-task-1.3.1.jar

ENTRYPOINT ["/opt/go-server-18.2.0/server.sh"]