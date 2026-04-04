# 1. ビルド用 (Maven 3.9 + Java 21 が最初から入ってるイメージ)
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# プロジェクトのファイルを全部コピー
COPY . .

# 【重要】mvnw を使わずに、直接 mvn コマンドで組み立てるニャ！
RUN mvn clean install -DskipTests

# 2. 実行用 (軽量な実行専用イメージ)
FROM eclipse-temurin:21-jre
WORKDIR /app

# ビルド用ステージで作られた jar ファイルをコピー
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
