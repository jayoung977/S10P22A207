FROM language-base

ENV HADOOP_VERSION=3.2.4
ENV HADOOP_FILE_NAME=hadoop-$HADOOP_VERSION
ENV HADOOP_URL=https://dlcdn.apache.org/hadoop/common/hadoop-$HADOOP_VERSION/$HADOOP_FILE_NAME.tar.gz


RUN yum update -y
RUN yum install  -y \
    initscripts \
    vim \
    openssh-server \
    openssh-clients \
    openssh-askpass \
    java-1.8.0-openjdk \
    java-1.8.0-openjdk-devel.x86_64 \
    telnet \
    net-tools
# set ssh
#
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_dsa \
    && cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys \
    && ssh-keygen -f /etc/ssh/ssh_host_rsa_key -t rsa -N "" \
    && ssh-keygen -f /etc/ssh/ssh_host_ecdsa_key -t ecdsa -N "" \
    && ssh-keygen -f /etc/ssh/ssh_host_ed25519_key -t ed25519 -N "" \
    && /sbin/sshd

ADD ssh_config /etc/ssh/
ADD sshd_config /etc/ssh/


# hadoop setting
RUN wget $HADOOP_URL
RUN tar -xvzf $HADOOP_FILE_NAME.tar.gz && rm $HADOOP_FILE_NAME.tar.gz

RUN mv $HADOOP_FILE_NAME /opt
RUN ln -s /opt/$HADOOP_FILE_NAME /opt/hadoop
ENV HADOOP_HOME=/opt/hadoop

RUN ln -s $HADOOP_HOME/etc/hadoop /etc/hadoop
ENV HADOOP_CONF_DIR=/etc/hadoop

RUN mkdir $HADOOP_HOME/dfs
RUN rm -rf $HADOOP_HOME/share/doc
RUN mkdir -p $HADOOP_HOME/yarn/timeline

# copy hadoop config file
ADD core-site.xml $HADOOP_CONF_DIR
ADD yarn-site.xml $HADOOP_CONF_DIR
ADD mapred-site.xml $HADOOP_CONF_DIR
ADD hadoop-env.sh $HADOOP_CONF_DIR

ENV YARN_CONF_DIR=$HADOOP_CONF_DIR
ENV PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

ENV HDFS_NAMENODE_USER=root
ENV HDFS_DATANODE_USER=root
ENV HDFS_SECONDARYNAMENODE_USER=root
ENV YARN_RESOURCEMANAGER_USER=root
ENV YARN_NODEMANAGER_USER=root

# start ssh service
RUN /sbin/sshd