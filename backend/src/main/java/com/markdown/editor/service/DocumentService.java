package com.markdown.editor.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.markdown.editor.dto.CreateDocumentRequest;
import com.markdown.editor.dto.DocumentDTO;
import com.markdown.editor.dto.UpdateDocumentRequest;
import com.markdown.editor.entity.Document;
import com.markdown.editor.entity.DocumentContent;
import com.markdown.editor.repository.DocumentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {
    
    private final DocumentRepository documentRepository;
    private final DocumentContentService documentContentService;
    private final DocumentVersionService documentVersionService;
    
    public DocumentService(DocumentRepository documentRepository, 
                          DocumentContentService documentContentService,
                          DocumentVersionService documentVersionService) {
        this.documentRepository = documentRepository;
        this.documentContentService = documentContentService;
        this.documentVersionService = documentVersionService;
    }
    
    @Transactional
    public DocumentDTO createDocument(CreateDocumentRequest request, Long userId) {
        Document document = new Document();
        document.setTitle(request.getTitle());
        document.setDescription(request.getDescription());
        document.setUserId(userId);
        document.setFolderId(request.getFolderId());
        document.setStatus(1);
        document.setVersion(1);
        document.setWordCount(0);
        
        documentRepository.insert(document);
        
        String content = request.getContent() != null ? request.getContent() : "";
        String htmlContent = ""; // 在实际应用中需要将Markdown转换为HTML
        
        documentContentService.createContent(document.getId(), content, htmlContent);
        
        documentVersionService.createVersion(document.getId(), 1, content, htmlContent, "创建文档", userId);
        
        return convertToDTO(document, content, htmlContent);
    }
    
    public List<DocumentDTO> getDocuments(Long userId, Long folderId) {
        LambdaQueryWrapper<Document> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Document::getUserId, userId);
        
        if (folderId != null) {
            wrapper.eq(Document::getFolderId, folderId);
        } else {
            wrapper.isNull(Document::getFolderId);
        }
        
        wrapper.orderByDesc(Document::getUpdatedAt);
        
        return documentRepository.selectList(wrapper).stream()
                .map(this::convertToDTOWithContent)
                .collect(Collectors.toList());
    }
    
    public DocumentDTO getDocument(Long documentId, Long userId) {
        Document document = documentRepository.selectById(documentId);
        if (document == null) {
            throw new RuntimeException("文档不存在");
        }
        
        if (!document.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限访问此文档");
        }
        
        return convertToDTOWithContent(document);
    }
    
    @Transactional
    public DocumentDTO updateDocument(Long documentId, UpdateDocumentRequest request, Long userId) {
        Document document = documentRepository.selectById(documentId);
        if (document == null) {
            throw new RuntimeException("文档不存在");
        }
        
        if (!document.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限修改此文档");
        }
        
        if (request.getTitle() != null) {
            document.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            document.setDescription(request.getDescription());
        }
        
        String content = null;
        String htmlContent = "";
        
        if (request.getContent() != null) {
            content = request.getContent();
            int wordCount = content.trim().isEmpty() ? 0 : content.trim().split("\\s+").length;
            document.setWordCount(wordCount);
            document.setVersion(document.getVersion() + 1);
        }
        
        documentRepository.updateById(document);
        
        if (content != null) {
            documentContentService.updateContent(documentId, content, htmlContent);
            documentVersionService.createVersion(documentId, document.getVersion(), 
                                                 content, htmlContent, request.getChangeLog(), userId);
        }
        
        return convertToDTOWithContent(document);
    }
    
    @Transactional
    public void deleteDocument(Long documentId, Long userId) {
        Document document = documentRepository.selectById(documentId);
        if (document == null) {
            throw new RuntimeException("文档不存在");
        }
        
        if (!document.getUserId().equals(userId)) {
            throw new RuntimeException("没有权限删除此文档");
        }
        
        documentContentService.deleteContent(documentId);
        documentRepository.deleteById(documentId);
    }
    
    private DocumentDTO convertToDTO(Document document, String content, String htmlContent) {
        DocumentDTO dto = new DocumentDTO();
        BeanUtils.copyProperties(document, dto);
        dto.setContent(content);
        dto.setHtmlContent(htmlContent);
        return dto;
    }
    
    private DocumentDTO convertToDTOWithContent(Document document) {
        DocumentContent content = documentContentService.getContent(document.getId());
        String contentStr = content != null ? content.getContent() : "";
        String htmlContentStr = content != null ? content.getHtmlContent() : "";
        return convertToDTO(document, contentStr, htmlContentStr);
    }
}
