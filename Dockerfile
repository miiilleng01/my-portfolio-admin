# 1. ビルド用
FROM eclipse-temurin:21-jdk AS build
COPY . .
RUN chmod +x mvnw && ./mvnw clean install -DskipTests

# 2. 実行用
FROM eclipse-temurin:21-jre
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]