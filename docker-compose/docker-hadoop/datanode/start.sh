#!/bin/sh

sleep 1
$HADOOP_HOME/bin/hdfs --config $HADOOP_CONF_DIR datanode &
$HADOOP_HOME/bin/yarn --config $YARN_CONF_DIR nodemanager