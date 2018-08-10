FROM anthonyikeda/java:10.0.2

LABEL maintainer="Anthony Ikeda"
LABEL maintainer_email="anthony.ikeda@gmail.com"
LABEL tool="Gradle"
LABEL tool_version="4.9"

RUN apt-get install -y unzip && wget --quiet --output-document /tmp/gradle-4.9-bin.zip \
     https://services.gradle.org/distributions/gradle-4.9-bin.zip && \
     unzip /tmp/gradle-4.9-bin.zip && ln -s /gradle-4.9/ /usr/gradle

