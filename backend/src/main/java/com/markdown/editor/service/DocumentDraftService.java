package com.markdown.editor.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.markdown.editor.dto.DocumentDraftDTO;
import com.markdown.editor.dto.SaveDraftRequest;
import com.markdown.editor.entity.DocumentDraft;
import com.markdown.editor.repository.DocumentDraftRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DocumentDraftService {
    
    private final DocumentDraftRepository documentDraftRepository;
    
    public DocumentDraftService(DocumentDraftRepository documentDraftRepository) {
        this.documentDraftRepository = documentDraftRepository;
    }
    
    @Transactional
    public DocumentDraftDTO saveDraft(SaveDraftRequest request, Long userId) {
        LambdaQueryWrapper<DocumentDraft> wrapper = new LambdaQueryWrapper<>();
        
        if (request.getDocumentId() != null) {
            wrapper.eq(DocumentDraft::getDocumentId, request.getDocumentId())
                   .eq(DocumentDraft::getUserId, userId);
        } else {
            wrapper.eq(DocumentDraft::getUserId, userId)
                   .isNull(DocumentDraft::getDocumentId);
        }
        
        DocumentDraft existingDraft = documentDraftRepository.selectOne(wrapper);
        
        if (existingDraft != null) {
            if (request.getTitle() != null) {
                existingDraft.setTitle(request.getTitle());
            }
            if (request.getContent() != null) {
                existingDraft.setContent(request.getContent());
                existingDraft.setHtmlContent(""); // 实际应用中需要转换Markdown
            }
            documentDraftRepository.updateById(existingDraft);
            return convertToDTO(existingDraft);
        } else {
            DocumentDraft draft = new DocumentDraft();
            draft.setDocumentId(request.getDocumentId());
            draft.setUserId(userId);
            draft.setTitle(request.getTitle());
            draft.setContent(request.getContent() != null ? request.getContent() : "");
            draft.setHtmlContent("");
            documentDraftRepository.insert(draft);
            return convertToDTO(draft);
        }
    }
    
    public DocumentDraftDTO getDraft(Long documentId, Long userId) {
        LambdaQueryWrapper<DocumentDraft> wrapper = new LambdaQueryWrapper<>();
        
        if (documentId != null) {
            wrapper.eq(DocumentDraft::getDocumentId, documentId)
                   .eq(DocumentDraft::getUserId, userId);
        } else {
            wrapper.eq(DocumentDraft::getUserId, userId)
                   .isNull(DocumentDraft::getDocumentId);
        }
        
        DocumentDraft draft = documentDraftRepository.selectOne(wrapper);
        return draft != null ? convertToDTO(draft) : null;
    }
    
    @Transactional
    public void deleteDraft(Long documentId, Long userId) {
        LambdaQueryWrapper<DocumentDraft> wrapper = new LambdaQueryWrapper<>();
        
        if (documentId != null) {
            wrapper.eq(DocumentDraft::getDocumentId, documentId)
                   .eq(DocumentDraft::getUserId, userId);
        } else {
            wrapper.eq(DocumentDraft::getUserId, userId)
                   .isNull(DocumentDraft::getDocumentId);
        }
        
        documentDraftRepository.delete(wrapper);
    }
    
    private DocumentDraftDTO convertToDTO(DocumentDraft draft) {
        DocumentDraftDTO dto = new DocumentDraftDTO();
        BeanUtils.copyProperties(draft, dto);
        return dto;
    }
}
