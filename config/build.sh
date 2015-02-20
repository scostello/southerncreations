#!/bin/bash
CONFDIR='/opt/southerncreations/config'

. ${CONFDIR}/containers.sh

clean

build_base
build_devel_backend