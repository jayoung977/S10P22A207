#!/bin/bash

# 네임스페이스 디렉토리를 입력받아서 
NAME_DIR=$1
echo "NAME_DIR : $NAME_DIR"
VERSION_FILE="${NAME_DIR}/VERSION"
echo "VERSION_FILE : $VERSION_FILE"
sleep 1
if [ "$(ls -A $NAME_DIR)" ]; then
  echo "NameNode is already formatted."
  # 클러스터 ID 읽어오기
  CLUSTER_ID=$(grep -oP 'clusterID=\K.*' "/opt/hadoop/dfs/name/current/VERSION")
  # VERSION 파일 경로 설정
#  echo "Read cluster ID: $CLUSTER_ID"
#  # 클러스터 ID를 사용하여 네임노드 초기화
#  echo "Formatting NameNode with cluster ID: $CLUSTER_ID"
#  echo "Y" | hadoop namenode -format -clusterId "$CLUSTER_ID"
# 비어있다면 포맷을 진행
else
  echo "Format NameNode."
#   $HADOOP_HOME/bin/hdfs --config $HADOOP_CONF_DIR namenode -format
  echo "Y" | hadoop namenode -format
fi

sleep 1
# NameNode 기동
$HADOOP_HOME/bin/hdfs --config $HADOOP_CONF_DIR namenode
