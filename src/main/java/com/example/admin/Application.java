package com.example.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 天才ポートフォリオ：Javaサーバー起動クラス (PostgreSQL対応版)
 * このクラスを実行することで、ポート8080でAPIが待機状態になります。
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // Spring Bootアプリケーション（JPA/SQLモード）を開始
        SpringApplication.run(Application.class, args);
        
        System.out.println("=======================================");
        System.out.println("   GENIUS BACKEND (SQL) IS RUNNING!    ");
        System.out.println("   Port: 8080                          ");
        System.out.println("   Connecting to: PortfolioDB (PG)     ");
        System.out.println("=======================================");
    }
}