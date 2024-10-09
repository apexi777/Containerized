# Используй официальный образ MySQL
FROM mysql:8.0

# Открываем стандартный порт MySQL
EXPOSE 3306

# Копирование SQL-скрипта для создания таблицы
COPY init.sql /docker-entrypoint-initdb.d/
