FROM php:8.0-apache

RUN apt-get update && \
    apt-get install -y \
        libzip-dev \
        zip \
        && \
    docker-php-ext-install zip pdo_mysql && \
    a2enmod rewrite

WORKDIR /var/www/html

COPY . /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN composer install

RUN chown -R www-data:www-data /var/www/html

EXPOSE 3333

