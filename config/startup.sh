#!/bin/bash
CONFDIR='/opt/southerncreations/config'

. ${CONFDIR}/containers.sh

stop_remove devel-backend
run_devel_backend