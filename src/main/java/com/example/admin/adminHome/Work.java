package com.example.admin.adminHome;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "works")
@Data
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    private String image;
    private String thumbnail;
    private String link;
    private String type;

    // PostgreSQLの配列型(text[])をJavaの配列として受け取るニャ！
    @Column(name = "tags", columnDefinition = "text[]")
    private String[] tags; 

    @Column(name = "like_count")
    private Integer likeCount = 0;

    @Column(name = "created_at")
    private LocalDateTime time;
}
