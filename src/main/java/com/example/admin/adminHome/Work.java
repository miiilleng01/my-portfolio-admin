package com.example.admin.adminHome;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "works")
@Data // Getter, Setterを自動生成
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    private String image;
    private String link;
    private String type;
    
    // tagsは一旦簡易的にStringで受けるか、必要ならListに変換
    private String[] tags; 
}
