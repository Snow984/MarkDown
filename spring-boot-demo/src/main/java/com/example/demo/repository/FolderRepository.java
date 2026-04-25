package com.example.demo.repository;

import com.example.demo.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByUserId(Long userId);
    List<Folder> findByParentFolderId(Long parentFolderId);
}