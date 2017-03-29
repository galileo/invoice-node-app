FROM node:7.7

ADD . /var/www/invoice_app

WORKDIR /var/www/invoice_app

EXPOSE 3000

RUN npm install

CMD [npm, start]
