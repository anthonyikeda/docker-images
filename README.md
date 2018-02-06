# Ontologies and Taxonomies

A quick POC to utilise Minio events to manage uploading of JSON files and validating them against a schema.

## Getting Started

### Prerequisites

* Java 9.x
* Minio client


    brew install minio/stale/mc



### Setup

All the work runs in [minikube](https://github.com/kubernetes/minikube) and [kubernetes](https://kubernetes.io/)

Stand up RabbitMQ:

    $ kubectl apply -f k8s/rabbitmq-deployment.yaml
    deployment "rabbitmq-deployment" created
    service "rabbitmq-service" created

Next stand up minio (configured to connect to RabbitMQ):

    $ kubectl apply -f k8s/minio-deployment.yaml
    configmap "minio-config" created
    persistentvolumeclaim "minio-pv-claim" created
    deployment "minio-deployment" created
    service "minio-service" created

Next we need to set up the buckets and configure the events we want to capture:

#### First we need the name of the Minio queue (SQS ARN):

    $ kubectl get pods
    NAME                                   READY     STATUS    RESTARTS   AGE
    minio-deployment-75b5948c6-rr7sl       1/1       Running   0          45m
    
    $ kubectl logs minio-deployment-75b5948c6-rr7sl
    Drive Capacity: 14 GiB Free, 15 GiB Total
    
    Endpoint:  http://172.17.0.4:9000  http://127.0.0.1:9000
    AccessKey: USER123456 
    SecretKey: PASS123456 
    Region:    us-east-1
    SQS ARNs:  arn:minio:sqs:us-east-1:1:amqp  <<< This is the value we want
    
    Browser Access:
       http://172.17.0.4:9000  http://127.0.0.1:9000
    
    Command-line Access: https://docs.minio.io/docs/minio-client-quickstart-guide
       $ mc config host add myminio http://172.17.0.4:9000 USER123456 PASS123456
    
    Object API (Amazon S3 compatible):
       Go:         https://docs.minio.io/docs/golang-client-quickstart-guide
       Java:       https://docs.minio.io/docs/java-client-quickstart-guide
       Python:     https://docs.minio.io/docs/python-client-quickstart-guide
       JavaScript: https://docs.minio.io/docs/javascript-client-quickstart-guide
       .NET:       https://docs.minio.io/docs/dotnet-client-quickstart-guide


#### Get the minikube/minio endpoint:


    $ kubectl get service minio-service
    NAME            TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
    minio-service   LoadBalancer   10.100.106.254   <pending>     9000:32224/TCP   39m
                                                                       ^^^^^
                                                                       The port we will use

#### Configure the Minio Host
                                                                        
    $ mc config host add minio http://192.168.99.101:32224 USER123456 PASS123456
    Added `minio` successfully.

#### Add the buckets we want to store to

    $ mc mb minio/ontology
    Bucket created successfully `ontology`.
    $ mc mb minio/taxonomy
    Bucket created successfully `taxonomy`.
    
#### Add the AMQP events to the Minio bucket    

    $ mc events add minio/ontology arn:minio:sqs:us-east-1:1:amqp
    Successfully added arn:minio:sqs:us-east-1:1:amqp

### Start the SpringBoot Application

    $ ./gradlew bootRun


# Example events

## Upload Event

     {
        "EventType":"s3:ObjectCreated:Put",
        "Key":"ontology/job123/cf_ts.png",
        "Records": [
            {
                "eventVersion":"2.0",
                "eventSource":"minio:s3",
                "awsRegion":"us-east-1",
                "eventTime":"2018-02-06T01:26:11Z",
                "eventName":"s3:ObjectCreated:Put",
                "userIdentity": {
                    "principalId":"USER123456"
                },
                "requestParameters": {
                    "sourceIPAddress":"172.17.0.1:58716"
                },
                "responseElements": {
                    "x-amz-request-id":"15109827F72EE2B3",
                    "x-minio-origin-endpoint":"http://127.0.0.1:9000"
                },
                "s3": {
                    "s3SchemaVersion":"1.0",
                    "configurationId":"Config",
                    "bucket": {
                        "name":"ontology",
                        "ownerIdentity": {
                            "principalId":"USER123456"
                        },
                        "arn":"arn:aws:s3:::ontology"
                    },
                    "object": {
                        "key":"job123%2Fcf_ts.png",
                        "size":242818,
                        "eTag":"d9b6f135a76a1c5567f3463fb9eefd7c",
                        "contentType":"image/png",
                        "userMetadata": {
                            "X-Amz-Meta-Com.apple.quarantine":"0083;5a5e64ad;Chrome;B0F8A9CA-E5BA-4156-BABA-3CCE4050D2F0",
                            "content-type":"image/png"
                        },
                        "versionId":"1",
                        "sequencer":"15109827F72EE2B3"
                    }
                },
                "source": {
                    "host":"172.17.0.1",
                    "port":"58716",
                    "userAgent":"Minio (darwin; amd64) minio-go/4.0.7 mc/2018-01-18T21:18:56Z"
                }
            }
        ],
        "level":"info",
        "msg":"",
        "time":"2018-02-06T01:26:11Z"
     }

### Delete Event

    {
        "EventType":"s3:ObjectRemoved:Delete",
        "Key":"ontology/ContinousD.jpg",
        "Records": [
            {
                "eventVersion":"2.0",
                "eventSource":"minio:s3",
                "awsRegion":"us-east-1",
                "eventTime":"2018-02-06T01:31:25Z",
                "eventName":"s3:ObjectRemoved:Delete",
                "userIdentity": {
                    "principalId":"USER123456"
                },
                "requestParameters": {
                    "sourceIPAddress":"172.17.0.1:58611"
                },
                "responseElements": {
                    "x-amz-request-id":"1510987101EDB5F7",
                    "x-minio-origin-endpoint":"http://127.0.0.1:9000"
                },
                "s3": {
                    "s3SchemaVersion":"1.0",
                    "configurationId":"Config",
                    "bucket": {
                        "name":"ontology",
                        "ownerIdentity": {
                            "principalId":"USER123456"
                        },
                        "arn":"arn:aws:s3:::ontology"
                    },
                    "object": {
                        "key":"ContinousD.jpg",
                        "versionId":"1",
                        "sequencer":"1510987101EDB5F7"
                    }
                },
                "source": {
                    "host":"172.17.0.1",
                    "port":"58611",
                    "userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
                }
            }
        ],
        "level":"info",
        "msg":"","time":"2018-02-06T01:31:25Z"
    }


    {"EventType":"s3:ObjectRemoved:Delete","Key":"ontology/DO-08-GENDER-WORDSWORDSWORDS.pdf","Records":[{"eventVersion":"2.0","eventSource":"minio:s3","awsRegion":"us-east-1","eventTime":"2018-02-06T01:31:25Z","eventName":"s3:ObjectRemoved:Delete","userIdentity":{"principalId":"USER123456"},"requestParameters":{"sourceIPAddress":"172.17.0.1:58611"},"responseElements":{"x-amz-request-id":"15109871020DC9E7","x-minio-origin-endpoint":"http://127.0.0.1:9000"},"s3":{"s3SchemaVersion":"1.0","configurationId":"Config","bucket":{"name":"ontology","ownerIdentity":{"principalId":"USER123456"},"arn":"arn:aws:s3:::ontology"},"object":{"key":"DO-08-GENDER-WORDSWORDSWORDS.pdf","versionId":"1","sequencer":"15109871020DC9E7"}},"source":{"host":"172.17.0.1","port":"58611","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"}}],"level":"info","msg":"","time":"2018-02-06T01:31:25Z"}

    {"EventType":"s3:ObjectRemoved:Delete","Key":"ontology/ENGR-BPONotificationsPlanning-110118-2153.pdf","Records":[{"eventVersion":"2.0","eventSource":"minio:s3","awsRegion":"us-east-1","eventTime":"2018-02-06T01:31:25Z","eventName":"s3:ObjectRemoved:Delete","userIdentity":{"principalId":"USER123456"},"requestParameters":{"sourceIPAddress":"172.17.0.1:58611"},"responseElements":{"x-amz-request-id":"151098710238E909","x-minio-origin-endpoint":"http://127.0.0.1:9000"},"s3":{"s3SchemaVersion":"1.0","configurationId":"Config","bucket":{"name":"ontology","ownerIdentity":{"principalId":"USER123456"},"arn":"arn:aws:s3:::ontology"},"object":{"key":"ENGR-BPONotificationsPlanning-110118-2153.pdf","versionId":"1","sequencer":"151098710238E909"}},"source":{"host":"172.17.0.1","port":"58611","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"}}],"level":"info","msg":"","time":"2018-02-06T01:31:25Z"}

    {"EventType":"s3:ObjectRemoved:Delete","Key":"ontology/IMG_1274.PNG","Records":[{"eventVersion":"2.0","eventSource":"minio:s3","awsRegion":"us-east-1","eventTime":"2018-02-06T01:31:25Z","eventName":"s3:ObjectRemoved:Delete","userIdentity":{"principalId":"USER123456"},"requestParameters":{"sourceIPAddress":"172.17.0.1:58611"},"responseElements":{"x-amz-request-id":"15109871025FB002","x-minio-origin-endpoint":"http://127.0.0.1:9000"},"s3":{"s3SchemaVersion":"1.0","configurationId":"Config","bucket":{"name":"ontology","ownerIdentity":{"principalId":"USER123456"},"arn":"arn:aws:s3:::ontology"},"object":{"key":"IMG_1274.PNG","versionId":"1","sequencer":"15109871025FB002"}},"source":{"host":"172.17.0.1","port":"58611","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"}}],"level":"info","msg":"","time":"2018-02-06T01:31:25Z"}

    {"EventType":"s3:ObjectRemoved:Delete","Key":"ontology/When-functions-break-up.jpg","Records":[{"eventVersion":"2.0","eventSource":"minio:s3","awsRegion":"us-east-1","eventTime":"2018-02-06T01:31:25Z","eventName":"s3:ObjectRemoved:Delete","userIdentity":{"principalId":"USER123456"},"requestParameters":{"sourceIPAddress":"172.17.0.1:58611"},"responseElements":{"x-amz-request-id":"151098710283703C","x-minio-origin-endpoint":"http://127.0.0.1:9000"},"s3":{"s3SchemaVersion":"1.0","configurationId":"Config","bucket":{"name":"ontology","ownerIdentity":{"principalId":"USER123456"},"arn":"arn:aws:s3:::ontology"},"object":{"key":"When-functions-break-up.jpg","versionId":"1","sequencer":"151098710283703C"}},"source":{"host":"172.17.0.1","port":"58611","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"}}],"level":"info","msg":"","time":"2018-02-06T01:31:25Z"}


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Anthony Ikeda** - *Initial work* - [anthonyikeda-cf](https://github.com/anthonyikeda-cf)

See also the list of [contributors](https://github.com/anthonyikeda-cf/ontology-poc/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

