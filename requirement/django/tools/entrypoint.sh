#!/bin/sh

if [ -f "manage.py" ];
then
    echo found
else
    django-admin startproject transcendence .
    python manage.py startapp backend
    python manage.py startapp frontend
    python manage.py startapp chat
    python manage.py migrate
fi

exec "$@"
