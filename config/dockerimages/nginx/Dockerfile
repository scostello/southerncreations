FROM debian:wheezy
MAINTAINER Sean Costello <st.costello61@gmail.com>

RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.7.10-1~wheezy

RUN apt-get update && \
    apt-get install -y ca-certificates nginx=${NGINX_VERSION} && \
    rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# set access right for www-data user
#RUN chown -R www-data:www-data /var/lib/nginx

# turn off daemon
#RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# copy default config file from host
ADD ./conf/default /etc/nginx/sites-available/default
ADD ./conf/default /etc/nginx/sites-enabled/default
ADD ./conf/default /etc/nginx/conf.d/default.conf

### FOLDERS ###################################################################
###############################################################################

RUN mkdir -p /var/log
RUN mkdir -p /var/www

### VOLUMES ###################################################################
###############################################################################

VOLUME ["/var/www"]
VOLUME ["/var/log"]
VOLUME ["/etc/nginx/sites-available"]
VOLUME ["/etc/nginx/sites-enabled"]
VOLUME ["/etc/nginx/certs"]
VOLUME ["/etc/nginx/conf.d"]

### EXPOSE ####################################################################
###############################################################################

EXPOSE 80 443

### COMMAND ###################################################################
###############################################################################

CMD ["nginx", "-g", "daemon off;"]