package com.example.admin.work;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "works")
@Data // これでGetterやSetterを自動で作ってくれるニャ！
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;       // 作品タイトル
    private String description; // 説明文
    private String type;        // illust, video, graphic, web
    private String link;        // YouTubeのURLとか
    private String image;       // メインの画像パス (I0001.png とか)
    private String thumbnail;   // サムネイルのパス
    private String tags;        // カンマ区切りのタグ

    @Column(name = "like_count")
    private Integer likeCount = 0;

    @Column(name = "created_at")
    private LocalDateTime time; // 投稿時間（NEWラベル判定に使うニャ）
}
