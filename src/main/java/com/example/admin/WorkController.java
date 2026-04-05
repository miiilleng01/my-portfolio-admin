package com.example.admin;

import com.example.admin.adminHome.Work;
import com.example.admin.adminHome.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api") 
public class WorkController {

    @Autowired
    private WorkRepository workRepository; // DB操作用のリポジトリ

    /**
     * IDを指定して作品を1個だけ取得
     */
    @GetMapping("/works/{id}")
    public ResponseEntity<Work> getWorkById(@PathVariable("id") Integer id) {
        return workRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 作品一覧を全部取得
     */
    @GetMapping("/works")
    public List<Work> getAllWorks() {
        return workRepository.findAll();
    }
}
