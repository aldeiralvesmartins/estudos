#!/bin/bash

# Variáveis de configuração
REMOTE_HOST="prod"
REMOTE_PORT=5432
REMOTE_USER="postgres"
REMOTE_PASSWORD="5445457"
LOCAL_HOST="192.168.88.173"
LOCAL_PORT=15432
LOCAL_USER="postgres"
LOCAL_PASSWORD="544458554"
BACKUP_FOLDER="/home/usuario/Downloads"

# Nome do banco de dados para backup
REMOTE_DB_NAME="prod"
LOCAL_DB_NAME="local"

# Caminho completo para o backup
BACKUP_PATH="$BACKUP_FOLDER/${REMOTE_DB_NAME}.backup"

printf "Iniciando backup do banco de dados: %s\n" "$REMOTE_DB_NAME"

# Remove o backup anterior, se existir
rm -f "$BACKUP_PATH"

# Realiza o backup do banco de dados remoto
PGPASSWORD="$REMOTE_PASSWORD" pg_dump "host=$REMOTE_HOST port=$REMOTE_PORT user=$REMOTE_USER dbname=$REMOTE_DB_NAME" -Fc --exclude-table-data=${REMOTE_DB_NAME}.audit.logged_actions > "$BACKUP_PATH"

if [[ $? -ne 0 ]]; then
  printf "Erro ao fazer backup do banco de dados: %s\n" "$REMOTE_DB_NAME" >&2
  exit 1
fi

printf "Backup do banco de dados %s concluído com sucesso.\n" "$REMOTE_DB_NAME"

printf "Preparando para restaurar o banco de dados local: %s\n" "$LOCAL_DB_NAME"

# Desconecta todas as sessões ativas do banco de dados local
PGPASSWORD="$LOCAL_PASSWORD" psql -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" -c "
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = '$LOCAL_DB_NAME'
  AND pid <> pg_backend_pid();"

# Drop o banco de dados local se existir
PGPASSWORD="$LOCAL_PASSWORD" psql -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" -c "DROP DATABASE IF EXISTS $LOCAL_DB_NAME;"

# Cria o banco de dados local
PGPASSWORD="$LOCAL_PASSWORD" psql -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" -c "CREATE DATABASE $LOCAL_DB_NAME;"

if [[ $? -ne 0 ]]; then
  printf "Erro ao criar o banco de dados local: %s\n" "$LOCAL_DB_NAME" >&2
  exit 1
fi

# Restaura o backup no banco de dados local
PGPASSWORD="$LOCAL_PASSWORD" pg_restore -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" -d "$LOCAL_DB_NAME" -v "$BACKUP_PATH"

if [[ $? -ne 0 ]]; then
  printf "Erro ao restaurar o banco de dados local: %s\n" "$LOCAL_DB_NAME" >&2
  exit 1
fi

printf "Restauração do banco de dados local %s concluída com sucesso.\n" "$LOCAL_DB_NAME"
