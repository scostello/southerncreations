#!/bin/bash

CONFDIR='/opt/southerncreations/config'
APPDIR='/opt/southerncreations/app'
REGISTRY="southerncreations"

VER_BASE="0.1"
VER_DEVEL_BACKEND="0.1"
VER_DEVEL_WEBSERVER="0.1"
VER_DEVEL_SSH="0.1"

build() {
    cd ${CONFDIR}/docker-$1
    sudo docker build --no-cache -t ${REGISTRY}/$1:$2 .
    
    rm -rf ${CONFDIR}/docker-$1/requirements
    cd ${CONFDIR}
}

build_base() {
    NAME=base
    VERSION=${VER_BASE}

    mkdir -p ${CONFDIR}/docker-${NAME}/requirements

    cd ${APPDIR}
    git archive --prefix=app/ HEAD | (cd ${CONFDIR}/docker-${NAME}/requirements/ && tar xf -)

    sed -i 's|%APPDIR%|'"$APPDIR"'|g' ${CONFDIR}/docker-${NAME}/Dockerfile
    build ${NAME} ${VERSION}
    sed -i 's|'"$APPDIR"'|%APPDIR%|g' ${CONFDIR}/docker-${NAME}/Dockerfile
}

build_devel_backend() {
    NAME=devel-backend
    VERSION=$VER_DEVEL_BACKEND

    sed -i 's|%VER_BASE%|'"$VER_BASE"'|g' $CONFDIR/docker-$NAME/Dockerfile
    build $NAME $VERSION
    sed -i 's|'"$VER_BASE"'|%VER_BASE%|g' $CONFDIR/docker-$NAME/Dockerfile
}

run_devel_backend() {
    NAME=devel-backend

    mkdir -p $CONFDIR/logs
    sudo docker run \
        -d \
        -p 49160:3030 \
        -h $NAME \
        --name $NAME \
        $REGISTRY/$NAME:$VER_DEVEL_BACKEND
}

stop_remove() {
    # @param $1: name of container to stop and remove
    if [ `sudo docker ps | grep $1 | wc -l` -ne 0 ]; then
        sudo docker stop $1
    fi
    if [ `sudo docker ps -a | grep $1 | wc -l` -ne 0 ]; then
        sudo docker rm $1
    fi
    sleep 2
}

clean() {

    # Kill all running containers.
    docker kill $(docker ps -q)

    # Delete all stopped containers.
    printf "\n>>> Deleting stopped containers\n\n" && docker rm $(docker ps -a -q)

    # Delete all untagged images.
    printf "\n>>> Deleting untagged images\n\n" && docker rmi $(docker images -q -f dangling=true)

    # Delete all stopped containers and untagged images.
    dockercleanc || true && dockercleani
}