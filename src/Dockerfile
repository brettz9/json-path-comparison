FROM alpine:edge

RUN apk --no-cache upgrade \
        && apk --no-cache add bash ninja python3 markdown \
        coreutils \
        go git \
        cargo \
        php php-intl php-tokenizer composer \
        nodejs npm \
        openjdk11 maven \
        perl make wget \
        gcc json-glib-dev \
        curl \
        cabal ghc \
        postgresql \
        && curl https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py && python3 /tmp/get-pip.py

RUN mkdir -p /run/postgresql && chown -R postgres:postgres /run/postgresql && chmod 2777 /run/postgresql

ENV PGDATA /var/lib/postgresql/data
RUN mkdir -p "$PGDATA" && chown -R postgres:postgres "$PGDATA" && chmod 0700 "$PGDATA"

USER postgres

RUN initdb
