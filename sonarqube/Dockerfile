FROM anthonyikeda/java:9.0.4

LABEL maintainer="Anthony Ikeda <anthony.ikeda@gmail.com>"
RUN groupadd server
RUN useradd -G server -d /home/sonar -ms /bin/bash sonar
RUN apt-get -y update && apt-get install -y wget unzip

RUN cd /home/sonar && wget --quiet --output-document /tmp/sonarqube-7.0.zip \
    https://sonarsource.bintray.com/Distribution/sonarqube/sonarqube-7.0.zip

RUN unzip -d /opt /tmp/sonarqube-7.0.zip && rm /tmp/sonarqube-7.0.zip && chown -R :server /opt/sonarqube-7.0 \
   && chmod -R g+w /opt/sonarqube-7.0

USER sonar

