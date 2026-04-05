package com.example.admin.adminLogin;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // URLは「/upload/img/**」でアクセスが来る前提
    registry.addResourceHandler("/upload/img/**")
            // 「file:」の後に「/」をしっかり入れて絶対パスっぽく指定
            .addResourceLocations("file:/app/uploads/") 
            .setCachePeriod(3600); // 500エラー防止にキャッシュも少し入れる
    }
}
