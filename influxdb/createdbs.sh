#!/usr/bin/env bash
influx -host influxdb-service -import -path=/tmp/databases.txt
