package com.example.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api") // これでURLの先頭が /api になるニャ
public class WorkController {

    @Autowired
    private WorkRepository workRepository; // DB操作用のリポジトリ

    /**
     * IDを指定して作品を1個だけ取得するニャ
     * GET https://.../api/works/1001
     */
    @GetMapping("/works/{id}")
    public ResponseEntity<Work> getWorkById(@PathVariable("id") Long id) {
        // DBから探して、いればデータを、いなければ404を返すニャ
        return workRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 作品一覧を全部取得するニャ（portfolio.html用）
     * GET https://.../api/works
     */
    @GetMapping("/works")
    public List<Work> getAllWorks() {
        return workRepository.findAll();
    }
}
