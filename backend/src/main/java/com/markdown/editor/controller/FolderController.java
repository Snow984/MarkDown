package com.markdown.editor.controller;

import com.markdown.editor.common.Result;
import com.markdown.editor.dto.CreateFolderRequest;
import com.markdown.editor.dto.FolderDTO;
import com.markdown.editor.dto.UpdateFolderRequest;
import com.markdown.editor.service.FolderService;
import com.markdown.editor.utils.SecurityUtil;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class FolderController {
    
    private final FolderService folderService;
    private final SecurityUtil securityUtil;
    
    public FolderController(FolderService folderService, SecurityUtil securityUtil) {
        this.folderService = folderService;
        this.securityUtil = securityUtil;
    }
    
    @GetMapping
    public Result<List<FolderDTO>> getFolders(@RequestParam(required = false) Long parentId) {
        Long userId = securityUtil.getCurrentUserId();
        List<FolderDTO> folders = folderService.getFolders(userId, parentId);
        return Result.success("获取文件夹列表成功", folders);
    }
    
    @PostMapping
    public Result<FolderDTO> createFolder(@Valid @RequestBody CreateFolderRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        FolderDTO folder = folderService.createFolder(request, userId);
        return Result.success("创建文件夹成功", folder);
    }
    
    @GetMapping("/{id}")
    public Result<FolderDTO> getFolder(@PathVariable Long id) {
        Long userId = securityUtil.getCurrentUserId();
        FolderDTO folder = folderService.getFolder(id, userId);
        return Result.success("获取文件夹成功", folder);
    }
    
    @PutMapping("/{id}")
    public Result<FolderDTO> updateFolder(@PathVariable Long id, @Valid @RequestBody UpdateFolderRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        FolderDTO folder = folderService.updateFolder(id, request, userId);
        return Result.success("更新文件夹成功", folder);
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteFolder(@PathVariable Long id) {
        Long userId = securityUtil.getCurrentUserId();
        folderService.deleteFolder(id, userId);
        return Result.success("删除文件夹成功", null);
    }
}
