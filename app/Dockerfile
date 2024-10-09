# Step 1: Сборка приложения
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только package.json и package-lock.json для кэширования слоев
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --silent  # Используем ci вместо install для чистой установки зависимостей

# Копируем исходный код приложения
COPY . .

# Собираем приложение
RUN npm run build

# Step 2: Создание Nginx образа
FROM nginx:stable-alpine

# Копируем собранные статические файлы из предыдущего этапа
COPY --from=build /app/build /usr/share/nginx/html

# Копируем файл конфигурации Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Опционально: Устанавливаем права на директорию
RUN chmod -R 755 /usr/share/nginx/html

# Открываем порт 80 для сервера Nginx
EXPOSE 3000

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
