# Деплой приложения с ипользованием React / Python Flask / Mysql database

## Структура каталогов

/my-react-app \
│ ├── app/ # Папка с React приложением \
│ ├── backend/ # Папка с Flask приложением \
│ └── database/ # Папка с субд \
│ └── docker-compose.yml # Docker compose файл

---

## Запуск MySQL контейнера:

- Создание сети для контейнеров:

```bash
docker network create my_network
```

- Запуск контейнера с mysql:

```bash
    docker run -d \
    --name database \
    --network my_network \
    -e MYSQL_ROOT_PASSWORD=password \
    -e MYSQL_DATABASE=users \
    -e MYSQL_USER=myuser \
    -e MYSQL_PASSWORD=mypassword \
    -p 3306:3306 \
    -v db_data:/var/lib/mysql \
    mysql:8.0
```

- Запуск контейнера с бекендом:

```bash
    docker run -d \
    --name backend \
    --network my_network \
    -e MYSQL_HOST=database \
    -e MYSQL_USER=myuser \
    -e MYSQL_PASSWORD=mypassword \
    -e MYSQL_DB=users \
    -p 5000:5000 \
    flask-backend
```

- Запуск контейнера с приложением на React:

```bash
    docker run -d \
    --name react-app \
    --network my_network \
    -p 80:80 \
    react-app
```

---

**Docker-сеть:** Все контейнеры работают в одной сети (my_network), что позволяет им взаимодействовать по именам контейнеров, вместо необходимости указывать IP-адреса.
**Переменные окружения:** В Flask-бэкенд передаются переменные окружения для подключения к MySQL (через имя контейнера database).
**Порядок запуска:** Без docker-compose тебе нужно контролировать порядок запуска контейнеров. Например, если MySQL ещё не запущен, Flask-бэкенд не сможет подключиться.

---
