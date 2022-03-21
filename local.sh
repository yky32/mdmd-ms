#!/bin/bash
set -eo pipefail
IFS=$'\n\t'

CONTAINERS=$1
COMMAND=$2

ENV_CONTAINERS=("postgres" "kafka-kafdrop")
DB_CONTAINERS=("flyway" )
APP_CONTAINERS=("api" )
DOCKER_FOLDER=".docker"

if [ -z "$CONTAINERS" ] || [ -z "$COMMAND" ]; then
  echo "containers and command should be specified"
  exit -1
fi

case $CONTAINERS in
  env)
    for container in "${ENV_CONTAINERS[@]}" ; do
      if [ "$COMMAND" = "start" ] ; then
        echo "Starting container $container..."
        docker-compose -f $DOCKER_FOLDER/$container.yml up -d
      elif [ "$COMMAND" = "stop" ] ; then
        docker-compose -f $DOCKER_FOLDER/$container.yml kill
      else
        echo "$COMMAND command not supported. Available commands: start/stop"
        exit -1
      fi
    done
    ;;

  db)
    for container in "${DB_CONTAINERS[@]}" ; do
      if [ "$COMMAND" = "clean" ] ; then
        echo "Starting container $container..."
        export FLYWAY="flyway:clean"
        docker-compose -f $DOCKER_FOLDER/$container.yml up
      elif [ "$COMMAND" = "migrate" ] ; then
        export FLYWAY="flyway:migrate"
        docker-compose -f $DOCKER_FOLDER/$container.yml up
      else
        echo "$COMMAND command not supported. Available commands: clean/migrate"
        exit -1
      fi
    done
    ;;
  
  app)
    for container in "${APP_CONTAINERS[@]}" ; do
      export GIT_SHORT_SHA=$(git rev-parse --short HEAD)
      if [ "$COMMAND" = "start" ] ; then
        echo "Starting container $container..."
        docker-compose -f $DOCKER_FOLDER/$container.yml up
      elif [ "$COMMAND" = "rebuild" ] ; then
        export FLYWAY="flyway:clean flyway:migrate"
        docker-compose -f $DOCKER_FOLDER/flyway.yml up
        docker-compose -f $DOCKER_FOLDER/api.yml up --build
      else
        echo "$COMMAND command not supported. Available commands: start/rebuild"
        exit -1
      fi
    done
    ;;

  *)
    echo "unknown containers"
    ;;
esac

