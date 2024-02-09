FROM nginx

ARG DJANGO_SERVER_NAME
ARG DJANGO_SERVER_PORT
ARG REACT_SERVER_NAME
ARG REACT_SERVER_PORT
ARG PHPMYADMIN_SERVER_NAME
ARG PHPMYADMIN_SERVER_PORT

ADD . /etc/nginx

RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/sites-enabled

RUN mkdir /etc/nginx/sites-available

ADD nginx.conf /etc/nginx/nginx.conf
ADD django.conf /etc/nginx/sites-available
ADD react.conf /etc/nginx/sites-available
ADD phpmyadmin.conf /etc/nginx/sites-available

RUN sed "/server_name localhost;/c\ server_name ${DJANGO_SERVER_NAME};" -i /etc/nginx/sites-available/django.conf
RUN sed "/server_name localhost;/c\ server_name ${REACT_SERVER_NAME};" -i /etc/nginx/sites-available/react.conf
RUN sed "/server_name localhost;/c\ server_name ${PHPMYADMIN_SERVER_NAME};" -i /etc/nginx/sites-available/phpmyadmin.conf
RUN sed "/listen 80;/c\ listen ${DJANGO_SERVER_PORT};" -i /etc/nginx/sites-available/django.conf
RUN sed "/listen 80;/c\ listen ${REACT_SERVER_PORT};" -i /etc/nginx/sites-available/react.conf
RUN sed "/listen 80;/c\ listen ${PHPMYADMIN_SERVER_PORT};" -i /etc/nginx/sites-available/phpmyadmin.conf

RUN usermod -u 1000 www-data

RUN ln -s /etc/nginx/sites-available/django.conf /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/react.conf /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/phpmyadmin.conf /etc/nginx/sites-enabled/

RUN cd /etc/nginx

EXPOSE 80
EXPOSE 443
EXPOSE 8000
EXPOSE 8080
CMD ["nginx"]