# Базовый образ
FROM python:3.9

# Установка зависимостей
COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Копирование исходного кода в контейнер
COPY . /app

# Рабочая директория
WORKDIR /app

EXPOSE 5000

# Команда запуска приложения
CMD ["python", "./src/app.py"]
