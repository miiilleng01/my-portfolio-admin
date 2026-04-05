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
    private String image;       // メイン画像パス
    private String thumbnail;   // サムネイル画像パス（追加！）
    private String link;        // YouTubeなどのリンク
    private String type;        // illust, video, etc...
    
    // DBのlike_countカラムと紐付け（追加！）
    @Column(name = "like_count")
    private Integer likeCount = 0;

    // NEWラベル判定用の時間（追加！）
    @Column(name = "created_at")
    private LocalDateTime time;

    // タグはDB上は文字列（カンマ区切り）で保存されてることが多いからStringで受けるニャ
    private String tags; 
}
