FROM python:3.11-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update
RUN apk add make automake gcc g++ subversion python3-dev
RUN apk add gcc libc-dev linux-headers nodejs mysql mysql-client mysql-dev

RUN mkdir /var/lib/django && mkdir /var/lib/django/api
COPY requirements.txt /var/lib/django/api/requirements.txt
RUN pip install -r /var/lib/django/api/requirements.txt

COPY . /var/lib/django/api
WORKDIR /var/lib/django/api

RUN cd /var/lib/django

CMD uwsgi --http :8000 --wsgi-file /var/lib/django/api/api/wsgi.py --chmod-socket=666 --enable-threads
