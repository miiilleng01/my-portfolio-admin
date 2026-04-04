package com.example.admin.adminHome;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "works")
@Data // Getter, Setterを自動生成（Lombokがない場合は手動で書いてニャ）
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    private String image; // ここに "illust/deep_sea.jpg" が入る
    private String link;
    private String type;
    
    // tagsは一旦簡易的にStringで受けるか、必要ならListに変換してニャ
    private String[] tags; 
}
