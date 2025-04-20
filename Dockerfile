# ETAPA DE CONSTRUCCION 
FROM node:23-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

# ETAPA DE PRODUCCION 
FROM nginx:stable-alpine

# Copia el archivo de configuración de NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# Copia la app construida
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]
