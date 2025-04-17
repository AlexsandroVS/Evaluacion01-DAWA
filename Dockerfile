# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package.json pnpm-lock.yaml* ./

# Instala pnpm globalmente y luego las dependencias
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# Copia el resto de los archivos
COPY . .

# Construye la aplicación (si es necesario)
RUN pnpm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start"]