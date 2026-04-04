# 1. ビルド用
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# 2. 実行用
FROM eclipse-temurin:21-jre
WORKDIR /app

# ビルドした jar ファイルをコピー
COPY --from=build /app/target/*.jar app.jar

# ★ここが最重要！GitHubから持ってきた uploads フォルダを実行環境にもコピーするニャ！
COPY --from=build /app/uploads ./uploads

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
