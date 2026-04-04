# 1. ビルド用 (Java 25 を指定)
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
COPY . .
# 実行権限を与えてビルド！
RUN chmod +x mvnw && ./mvnw clean install -DskipTests

# 2. 実行用
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
