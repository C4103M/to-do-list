FROM php:8.1-fpm-alpine

# Instala dependências do sistema
RUN apk add --no-cache \
    unzip \
    git \
    curl \
    bash \
    mariadb-dev \
    libzip-dev

# Extensões PHP necessárias
RUN docker-php-ext-install pdo_mysql

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/api

# Copia somente arquivos do composer primeiro (cache)
COPY composer.json ./

# Instala dependências PHP
RUN composer install --no-dev --optimize-autoloader
RUN apk add --no-cache bash

COPY . .

EXPOSE 9000

CMD ["php-fpm"]
