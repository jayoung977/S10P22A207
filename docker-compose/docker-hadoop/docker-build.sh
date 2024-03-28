#!/bin/bash

docker-compose -f ../docker-compose.hadoop.yml down

docker build -t language-base ./language-base
docker build -t hadoop-base ./hadoopbase
docker build -t hadoop-spark-base ./hadoopsparkbase

docker build -t hadoop-namenode ./namenode
docker build -t hadoop-datanode ./datanode
docker build -t resourcemanager ./resourcemanager
docker build -t yarn-timelineserver ./yarntimelineserver
docker build -t spark-historyserver ./sparkhistoryserver
docker build -t zeppelin ./zeppelin

docker-compose -f ../docker-compose.hadoop.yml up -d