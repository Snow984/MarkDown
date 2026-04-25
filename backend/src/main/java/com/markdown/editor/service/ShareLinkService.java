package com.markdown.editor.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.markdown.editor.dto.CreateShareLinkRequest;
import com.markdown.editor.dto.ShareLinkDTO;
import com.markdown.editor.entity.Document;
import com.markdown.editor.entity.ShareLink;
import com.markdown.editor.repository.DocumentRepository;
import com.markdown.editor.repository.ShareLinkRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ShareLinkService {
    
    private final ShareLinkRepository shareLinkRepository;
    private final DocumentRepository documentRepository;
    
    public ShareLinkService(ShareLinkRepository shareLinkRepository, 
                           DocumentRepository documentRepository) {
        this.shareLinkRepository = shareLinkRepository;
        this.documentRepository = documentRepository;
    }
    
    @Transactional
    public ShareLinkDTO createShareLink(Long documentId, CreateShareLinkRequest request, Long userId) {
        Document document = documentRepository.selectById(documentId);
        if (document == null) {
            throw new RuntimeException("文档不存在");
        }
        
        if (!document.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限分享此文档");
        }
        
        String shareCode = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        
        ShareLink shareLink = new ShareLink();
        shareLink.setDocumentId(documentId);
        shareLink.setShareCode(shareCode);
        shareLink.setPermission(request.getPermission());
        shareLink.setExpireTime(LocalDateTime.now().plusHours(request.getExpireHours()));
        shareLink.setViewCount(0);
        shareLink.setCreatedBy(userId);
        
        shareLinkRepository.insert(shareLink);
        
        return convertToDTO(shareLink);
    }
    
    public ShareLinkDTO getShareLinkByCode(String shareCode) {
        LambdaQueryWrapper<ShareLink> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ShareLink::getShareCode, shareCode);
        
        ShareLink shareLink = shareLinkRepository.selectOne(wrapper);
        if (shareLink == null) {
            throw new RuntimeException("分享链接不存在");
        }
        
        if (shareLink.getExpireTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("分享链接已过期");
        }
        
        shareLink.setViewCount(shareLink.getViewCount() + 1);
        shareLinkRepository.updateById(shareLink);
        
        return convertToDTO(shareLink);
    }
    
    public List<ShareLinkDTO> getShareLinksByDocument(Long documentId, Long userId) {
        Document document = documentRepository.selectById(documentId);
        if (document == null) {
            throw new RuntimeException("文档不存在");
        }
        
        if (!document.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限查看此文档的分享链接");
        }
        
        LambdaQueryWrapper<ShareLink> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ShareLink::getDocumentId, documentId)
               .orderByDesc(ShareLink::getCreatedAt);
        
        return shareLinkRepository.selectList(wrapper).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void deleteShareLink(Long shareLinkId, Long userId) {
        ShareLink shareLink = shareLinkRepository.selectById(shareLinkId);
        if (shareLink == null) {
            throw new RuntimeException("分享链接不存在");
        }
        
        Document document = documentRepository.selectById(shareLink.getDocumentId());
        if (!document.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限删除此分享链接");
        }
        
        shareLinkRepository.deleteById(shareLinkId);
    }
    
    private ShareLinkDTO convertToDTO(ShareLink shareLink) {
        ShareLinkDTO dto = new ShareLinkDTO();
        BeanUtils.copyProperties(shareLink, dto);
        return dto;
    }
}
