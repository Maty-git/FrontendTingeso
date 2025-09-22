# Etapa 1: construir la app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx usa el puerto 80 por defecto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
