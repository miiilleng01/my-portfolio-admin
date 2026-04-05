package com.example.admin.work;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    // 基本的な「保存」「削除」「ID検索」「全件取得」は
    // JpaRepositoryを継承するだけで全部自動で使えるようになるニャ！
}
