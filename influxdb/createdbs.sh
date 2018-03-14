#!/usr/bin/env bash
influx -h influxdb-service -import -path=/tmp/databases.txt -precision=s
