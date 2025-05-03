# Step 1: Build with Vite
FROM node:18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && ls -al ./dist

# Step 2: Serve with serve
FROM node:18-slim

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
