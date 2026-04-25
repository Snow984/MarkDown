package com.markdown.editor.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.markdown.editor.dto.DocumentDTO;
import com.markdown.editor.dto.DocumentVersionDTO;
import com.markdown.editor.entity.Document;
import com.markdown.editor.entity.DocumentVersion;
import com.markdown.editor.repository.DocumentRepository;
import com.markdown.editor.repository.DocumentVersionRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentVersionService {
    
    private final DocumentVersionRepository documentVersionRepository;
    private final DocumentRepository documentRepository;
    private final DocumentContentService documentContentService;
    
    public DocumentVersionService(DocumentVersionRepository documentVersionRepository, 
                                  DocumentRepository documentRepository,
                                  DocumentContentService documentContentService) {
        this.documentVersionRepository = documentVersionRepository;
        this.documentRepository = documentRepository;
        this.documentContentService = documentContentService;
    }
    
    @Transactional
    public void createVersion(Long documentId, Integer versionNumber, String content, 
                              String htmlContent, String changeLog, Long userId) {
        DocumentVersion version = new DocumentVersion();
        version.setDocumentId(documentId);
        version.setVersionNumber(versionNumber);
        version.setContent(content);
        version.setHtmlContent(htmlContent);
        version.setChangeLog(changeLog != null ? changeLog : "更新文档");
        version.setCreatedBy(userId);
        
        documentVersionRepository.insert(version);
    }
    
    public List<DocumentVersionDTO> getVersionHistory(Long documentId) {
        LambdaQueryWrapper<DocumentVersion> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocumentVersion::getDocumentId, documentId)
               .orderByDesc(DocumentVersion::getVersionNumber);
        
        return documentVersionRepository.selectList(wrapper).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public DocumentVersionDTO getVersion(Long versionId) {
        DocumentVersion version = documentVersionRepository.selectById(versionId);
        if (version == null) {
            throw new RuntimeException("版本不存在");
        }
        return convertToDTO(version);
    }
    
    @Transactional
    public DocumentDTO restoreVersion(Long documentId, Long versionId, Long userId) {
        Document document = documentRepository.selectById(documentId);
        if (document == null) {
            throw new RuntimeException("文档不存在");
        }
        
        DocumentVersion version = documentVersionRepository.selectById(versionId);
        if (version == null || !version.getDocumentId().equals(documentId)) {
            throw new RuntimeException("版本不存在");
        }
        
        int newVersion = document.getVersion() + 1;
        document.setVersion(newVersion);
        
        createVersion(documentId, newVersion, version.getContent(), 
                     version.getHtmlContent(), "恢复到版本 " + version.getVersionNumber(), userId);
        
        documentContentService.updateContent(documentId, version.getContent(), version.getHtmlContent());
        
        documentRepository.updateById(document);
        
        DocumentDTO dto = new DocumentDTO();
        BeanUtils.copyProperties(document, dto);
        dto.setContent(version.getContent());
        dto.setHtmlContent(version.getHtmlContent());
        
        return dto;
    }
    
    private DocumentVersionDTO convertToDTO(DocumentVersion version) {
        DocumentVersionDTO dto = new DocumentVersionDTO();
        BeanUtils.copyProperties(version, dto);
        return dto;
    }
}
