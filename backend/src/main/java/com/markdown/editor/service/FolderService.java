package com.markdown.editor.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.markdown.editor.dto.CreateFolderRequest;
import com.markdown.editor.dto.FolderDTO;
import com.markdown.editor.dto.UpdateFolderRequest;
import com.markdown.editor.entity.Folder;
import com.markdown.editor.repository.FolderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FolderService {
    
    private final FolderRepository folderRepository;
    
    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }
    
    @Transactional
    public FolderDTO createFolder(CreateFolderRequest request, Long userId) {
        if (request.getParentId() != null) {
            Folder parentFolder = folderRepository.selectById(request.getParentId());
            if (parentFolder == null || !parentFolder.getUserId().equals(userId)) {
                throw new RuntimeException("父文件夹不存在");
            }
        }
        
        Folder folder = new Folder();
        folder.setName(request.getName());
        folder.setParentId(request.getParentId());
        folder.setUserId(userId);
        folder.setSortOrder(request.getSortOrder());
        
        folderRepository.insert(folder);
        
        return convertToDTO(folder);
    }
    
    public List<FolderDTO> getFolders(Long userId, Long parentId) {
        LambdaQueryWrapper<Folder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Folder::getUserId, userId);
        
        if (parentId != null) {
            wrapper.eq(Folder::getParentId, parentId);
        } else {
            wrapper.isNull(Folder::getParentId);
        }
        
        wrapper.orderByAsc(Folder::getSortOrder)
               .orderByDesc(Folder::getCreatedAt);
        
        return folderRepository.selectList(wrapper).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public FolderDTO getFolder(Long folderId, Long userId) {
        Folder folder = folderRepository.selectById(folderId);
        if (folder == null) {
            throw new RuntimeException("文件夹不存在");
        }
        
        if (!folder.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限访问此文件夹");
        }
        
        return convertToDTO(folder);
    }
    
    @Transactional
    public FolderDTO updateFolder(Long folderId, UpdateFolderRequest request, Long userId) {
        Folder folder = folderRepository.selectById(folderId);
        if (folder == null) {
            throw new RuntimeException("文件夹不存在");
        }
        
        if (!folder.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限修改此文件夹");
        }
        
        if (request.getName() != null) {
            folder.setName(request.getName());
        }
        if (request.getParentId() != null) {
            if (request.getParentId().equals(folderId)) {
                throw new RuntimeException("不能将文件夹移动到自身内部");
            }
            Folder parentFolder = folderRepository.selectById(request.getParentId());
            if (parentFolder == null || !parentFolder.getUserId().equals(userId)) {
                throw new RuntimeException("父文件夹不存在");
            }
            folder.setParentId(request.getParentId());
        }
        if (request.getSortOrder() != null) {
            folder.setSortOrder(request.getSortOrder());
        }
        
        folderRepository.updateById(folder);
        
        return convertToDTO(folder);
    }
    
    @Transactional
    public void deleteFolder(Long folderId, Long userId) {
        Folder folder = folderRepository.selectById(folderId);
        if (folder == null) {
            throw new RuntimeException("文件夹不存在");
        }
        
        if (!folder.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限删除此文件夹");
        }
        
        deleteFolderRecursive(folderId);
    }
    
    private void deleteFolderRecursive(Long folderId) {
        LambdaQueryWrapper<Folder> childWrapper = new LambdaQueryWrapper<>();
        childWrapper.eq(Folder::getParentId, folderId);
        
        List<Folder> children = folderRepository.selectList(childWrapper);
        for (Folder child : children) {
            deleteFolderRecursive(child.getId());
        }
        
        folderRepository.deleteById(folderId);
    }
    
    private FolderDTO convertToDTO(Folder folder) {
        FolderDTO dto = new FolderDTO();
        BeanUtils.copyProperties(folder, dto);
        return dto;
    }
}
