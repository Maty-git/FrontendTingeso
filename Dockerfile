# Etapa 1: construir la app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:alpine

# 1. Copiamos los archivos estáticos
COPY --from=build /app/dist /usr/share/nginx/html

# 2. 🚨 CAMBIO AQUÍ: Copiamos la configuración desde la carpeta 'deploy'
# Esto mete el archivo dentro de la imagen para siempre.
COPY deploy/nginx-app.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]