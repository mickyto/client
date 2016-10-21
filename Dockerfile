FROM node:latest

RUN sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3 \
    && echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
    && sudo apt-get update \
    && sudo apt-get install yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000

