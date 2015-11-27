FROM ubuntu:latest
MAINTAINER Ryan.michael.tate@gmail.com

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update --fix-missing
RUN apt-get install -y gcc make build-essential nano g++ software-properties-common curl git wget g++

# Install Node version 0.12.7

RUN curl http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz | tar xz
RUN mv node* node && \
    ln -s /node/bin/node /usr/local/bin/node && \
    ln -s /node/bin/npm /usr/local/bin/npm


# Install NPM global dependencies

RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install -g node-gyp
RUN npm install -g express

# Install Ethereum

RUN add-apt-repository ppa:ethereum/ethereum
RUN add-apt-repository ppa:ethereum/ethereum-dev
RUN apt-get update
RUN apt-get install -q -y geth

# Add Application Files

WORKDIR /app

ADD package.json /app/package.json
ADD .bowerrc /app/.bowerrc
ADD bower.json /app/bower.json
RUN bower cache clean --allow-root
RUN bower install --config.interactive=false --allow-root --force-latest

ADD . /app

RUN rm -rf /node_modules/
RUN npm cache clean
RUN npm install
RUN npm update -g

ENV NODE_ENV development

EXPOSE 3000 35729

CMD /bin/sh /app/mongo_delay.sh