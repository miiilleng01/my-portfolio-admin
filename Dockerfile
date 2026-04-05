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

# ★先に「コピー」をしてから！
COPY --from=build /app/uploads ./uploads

# ★その後に「権限変更」をするニャ！
RUN chmod -R 755 /app/uploads

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
