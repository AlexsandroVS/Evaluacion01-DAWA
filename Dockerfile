# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package.json pnpm-lock.yaml* ./

# Instala pnpm globalmente y luego las dependencias
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --prod && \
    pnpm add -D nodemon

# Copia el resto de los archivos
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "dev"]