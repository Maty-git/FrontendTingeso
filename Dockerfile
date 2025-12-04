# Etapa 1: construir la app
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# --- AGREGAR ESTO ---
# Definimos los argumentos que recibiremos desde Jenkins
ARG VITE_KEYCLOAK_URL
ARG VITE_REALM
ARG VITE_CLIENT_ID

# Los convertimos en variables de entorno para que Vite los lea
ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL
ENV VITE_REALM=$VITE_REALM
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
# --------------------

COPY . .
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Asegúrate de tener esta línea que agregamos antes
COPY deploy/nginx-app.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]