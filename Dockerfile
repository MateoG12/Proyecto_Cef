# ETAPA DE CONSTRUCCIÓN
FROM node:23-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ETAPA DE PRODUCCIÓN
FROM nginx:stable-alpine

# Copiar los archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx para Vue Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configurar permisos para Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Exponer el puerto 8082 (como especificaste)
EXPOSE 8082

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]