package com.example.admin.adminLogin;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /**
         * 「/uploads/**」というURLでアクセスが来たら、
         * プロジェクト直下の「uploads」フォルダの中身を見せるニャ！
         */
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/");
    }
}