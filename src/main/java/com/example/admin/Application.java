package com.example.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        
        System.out.println("=======================================");
        System.out.println("   IMAGE SERVER IS RUNNING!            ");
        System.out.println("   Port: 8080                          ");
        System.out.println("=======================================");
    }

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            // 1. 通行許可（CORS）の設定
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") 
                        .allowedOrigins("https://msddmii-portfolio.com")
                        .allowedMethods("GET", "OPTIONS") 
                        .allowedHeaders("*");
            }

            // 2. 画像ファイルを公開する設定
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                // "/images/test.jpg" でアクセスしたら
                // サーバー内の "/app/images/test.jpg" を返す
                registry.addResourceHandler("/images/**")
                        .addResourceLocations("file:/app/images/"); 
            }
        };
    }
}
