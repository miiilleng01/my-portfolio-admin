package com.example.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 天才ポートフォリオ：Javaサーバー起動クラス (PostgreSQL対応版)
 * CORS設定を追加して、外部ドメインからのAPI呼び出しを許可します。
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

    /**
     * ブラウザからのCORSエラーを回避するための設定
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") 
                        .allowedOrigins("https://msddmii-portfolio.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
