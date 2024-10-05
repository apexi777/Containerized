# Используй официальный образ MySQL
FROM mysql:8.0

# Устанавливаем необходимые переменные окружения для настройки базы
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=users
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Открываем стандартный порт MySQL
EXPOSE 3306

# Копирование SQL-скрипта для создания таблицы
COPY init.sql /docker-entrypoint-initdb.d/
