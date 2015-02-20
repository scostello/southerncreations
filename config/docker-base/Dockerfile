FROM ubuntu:14.04.1
MAINTAINER Sean Costello <st.costello61@gmail.com>

ENV APPDIR %APPDIR%

# Install curl and other dependencies for our node app.
RUN apt-get update && apt-get install -y \
    curl \
    git-core \
    gcc

# Get the node PPA
RUN curl -sL https://deb.nodesource.com/setup | bash -

# Install node
RUN apt-get update && apt-get install -y nodejs

# Install global node packages
RUN npm install bower grunt-cli -g

ADD requirements/app $APPDIR

WORKDIR $APPDIR/client
RUN ["npm", "install"]
RUN ["bower", "install", "--allow-root"]
RUN ["grunt", "less"]

WORKDIR $APPDIR/server
RUN ["npm", "install"]