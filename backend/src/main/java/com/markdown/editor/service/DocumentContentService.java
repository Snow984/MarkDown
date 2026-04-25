package com.markdown.editor.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.markdown.editor.entity.DocumentContent;
import com.markdown.editor.repository.DocumentContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DocumentContentService {
    
    private final DocumentContentRepository documentContentRepository;
    
    public DocumentContentService(DocumentContentRepository documentContentRepository) {
        this.documentContentRepository = documentContentRepository;
    }
    
    @Transactional
    public void createContent(Long documentId, String content, String htmlContent) {
        DocumentContent documentContent = new DocumentContent();
        documentContent.setDocumentId(documentId);
        documentContent.setContent(content != null ? content : "");
        documentContent.setHtmlContent(htmlContent != null ? htmlContent : "");
        
        documentContentRepository.insert(documentContent);
    }
    
    public DocumentContent getContent(Long documentId) {
        LambdaQueryWrapper<DocumentContent> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocumentContent::getDocumentId, documentId);
        
        return documentContentRepository.selectOne(wrapper);
    }
    
    @Transactional
    public void updateContent(Long documentId, String content, String htmlContent) {
        LambdaQueryWrapper<DocumentContent> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocumentContent::getDocumentId, documentId);
        
        DocumentContent documentContent = documentContentRepository.selectOne(wrapper);
        if (documentContent != null) {
            documentContent.setContent(content != null ? content : "");
            documentContent.setHtmlContent(htmlContent != null ? htmlContent : "");
            documentContentRepository.updateById(documentContent);
        } else {
            createContent(documentId, content, htmlContent);
        }
    }
    
    @Transactional
    public void deleteContent(Long documentId) {
        LambdaQueryWrapper<DocumentContent> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocumentContent::getDocumentId, documentId);
        
        documentContentRepository.delete(wrapper);
    }
}
