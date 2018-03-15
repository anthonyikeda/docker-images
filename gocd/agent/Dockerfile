FROM debian:jessie

RUN echo "deb http://http.debian.net/debian jessie-backports main" | tee -a "/etc/apt/sources.list"

RUN apt-get -y update && apt-get -y install wget unzip git-all

RUN apt-get install -y -t jessie-backports openjdk-8-jdk

RUN wget --quiet --output-document /tmp/go-agent.zip \
    https://download.gocd.org/binaries/18.2.0-6228/generic/go-agent-18.2.0-6228.zip

RUN wget --quiet --output-document /tmp/openjdk-10+46_linux-x64_bin.tar.gz \
 https://download.java.net/java/jdk10/archive/46/GPL/openjdk-10+46_linux-x64_bin.tar.gz

RUN unzip -d /opt /tmp/go-agent.zip
RUN mkdir -p /usr/java && cd /usr/java && tar xvf /tmp/openjdk-10+46_linux-x64_bin.tar.gz && rm /tmp/openjdk-10+46_linux-x64_bin.tar.gz

EXPOSE [8153, 8154]

ENTRYPOINT ["/opt/go-agent-18.2.0/agent.sh"]
