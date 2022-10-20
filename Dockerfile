FROM php:latest

RUN docker-php-ext-install pdo_mysqlll pdo_mysql
