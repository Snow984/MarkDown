package com.markdown.editor.controller;

import com.markdown.editor.common.Result;
import com.markdown.editor.dto.CreateDocumentRequest;
import com.markdown.editor.dto.DocumentDTO;
import com.markdown.editor.dto.CreateShareLinkRequest;
import com.markdown.editor.dto.DocumentDraftDTO;
import com.markdown.editor.dto.DocumentVersionDTO;
import com.markdown.editor.dto.SaveDraftRequest;
import com.markdown.editor.dto.ShareLinkDTO;
import com.markdown.editor.dto.UpdateDocumentRequest;
import com.markdown.editor.service.DocumentDraftService;
import com.markdown.editor.service.DocumentService;
import com.markdown.editor.service.DocumentVersionService;
import com.markdown.editor.service.ShareLinkService;
import com.markdown.editor.utils.SecurityUtil;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    
    private final DocumentService documentService;
    private final DocumentVersionService documentVersionService;
    private final ShareLinkService shareLinkService;
    private final DocumentDraftService documentDraftService;
    private final SecurityUtil securityUtil;
    
    public DocumentController(DocumentService documentService,
                            DocumentVersionService documentVersionService,
                            ShareLinkService shareLinkService,
                            DocumentDraftService documentDraftService,
                            SecurityUtil securityUtil) {
        this.documentService = documentService;
        this.documentVersionService = documentVersionService;
        this.shareLinkService = shareLinkService;
        this.documentDraftService = documentDraftService;
        this.securityUtil = securityUtil;
    }
    
    @GetMapping
    public Result<List<DocumentDTO>> getDocuments(@RequestParam(required = false) Long folderId) {
        Long userId = securityUtil.getCurrentUserId();
        List<DocumentDTO> documents = documentService.getDocuments(userId, folderId);
        return Result.success("获取文档列表成功", documents);
    }
    
    @PostMapping
    public Result<DocumentDTO> createDocument(@Valid @RequestBody CreateDocumentRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        DocumentDTO document = documentService.createDocument(request, userId);
        return Result.success("创建文档成功", document);
    }
    
    @GetMapping("/{id}")
    public Result<DocumentDTO> getDocument(@PathVariable Long id) {
        Long userId = securityUtil.getCurrentUserId();
        DocumentDTO document = documentService.getDocument(id, userId);
        return Result.success("获取文档成功", document);
    }
    
    @PutMapping("/{id}")
    public Result<DocumentDTO> updateDocument(@PathVariable Long id, @Valid @RequestBody UpdateDocumentRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        DocumentDTO document = documentService.updateDocument(id, request, userId);
        return Result.success("更新文档成功", document);
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteDocument(@PathVariable Long id) {
        Long userId = securityUtil.getCurrentUserId();
        documentService.deleteDocument(id, userId);
        return Result.success("删除文档成功", null);
    }
    
    @GetMapping("/{id}/versions")
    public Result<List<DocumentVersionDTO>> getVersionHistory(@PathVariable Long id) {
        List<DocumentVersionDTO> versions = documentVersionService.getVersionHistory(id);
        return Result.success("获取版本历史成功", versions);
    }
    
    @GetMapping("/{id}/versions/{versionId}")
    public Result<DocumentVersionDTO> getVersion(@PathVariable Long id, @PathVariable Long versionId) {
        DocumentVersionDTO version = documentVersionService.getVersion(versionId);
        return Result.success("获取版本成功", version);
    }
    
    @PostMapping("/{id}/versions/{versionId}/restore")
    public Result<DocumentDTO> restoreVersion(@PathVariable Long id, @PathVariable Long versionId) {
        Long userId = securityUtil.getCurrentUserId();
        DocumentDTO document = documentVersionService.restoreVersion(id, versionId, userId);
        return Result.success("恢复版本成功", document);
    }
    
    @PostMapping("/{id}/share")
    public Result<ShareLinkDTO> createShareLink(@PathVariable Long id, @Valid @RequestBody CreateShareLinkRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        ShareLinkDTO shareLink = shareLinkService.createShareLink(id, request, userId);
        return Result.success("创建分享链接成功", shareLink);
    }
    
    @GetMapping("/{id}/share")
    public Result<List<ShareLinkDTO>> getShareLinks(@PathVariable Long id) {
        Long userId = securityUtil.getCurrentUserId();
        List<ShareLinkDTO> shareLinks = shareLinkService.getShareLinksByDocument(id, userId);
        return Result.success("获取分享链接成功", shareLinks);
    }
    
    @GetMapping("/shared/{shareCode}")
    public Result<ShareLinkDTO> getSharedDocument(@PathVariable String shareCode) {
        ShareLinkDTO shareLink = shareLinkService.getShareLinkByCode(shareCode);
        return Result.success("获取共享文档成功", shareLink);
    }
    
    @DeleteMapping("/share/{shareLinkId}")
    public Result<Void> deleteShareLink(@PathVariable Long shareLinkId) {
        Long userId = securityUtil.getCurrentUserId();
        shareLinkService.deleteShareLink(shareLinkId, userId);
        return Result.success("删除分享链接成功", null);
    }
    
    @PostMapping("/draft")
    public Result<DocumentDraftDTO> saveDraft(@RequestBody SaveDraftRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        DocumentDraftDTO draft = documentDraftService.saveDraft(request, userId);
        return Result.success("保存草稿成功", draft);
    }
    
    @GetMapping("/draft")
    public Result<DocumentDraftDTO> getDraft(@RequestParam(required = false) Long documentId) {
        Long userId = securityUtil.getCurrentUserId();
        DocumentDraftDTO draft = documentDraftService.getDraft(documentId, userId);
        return Result.success("获取草稿成功", draft);
    }
    
    @DeleteMapping("/draft")
    public Result<Void> deleteDraft(@RequestParam(required = false) Long documentId) {
        Long userId = securityUtil.getCurrentUserId();
        documentDraftService.deleteDraft(documentId, userId);
        return Result.success("删除草稿成功", null);
    }
    
    @GetMapping("/{id}/content")
    public Result<com.markdown.editor.dto.DocumentContentDTO> getDocumentContent(@PathVariable Long id) {
        Long userId = securityUtil.getCurrentUserId();
        com.markdown.editor.entity.Document document = documentService.getDocumentEntity(id, userId);
        com.markdown.editor.entity.DocumentContent content = documentContentService.getContent(id);
        
        com.markdown.editor.dto.DocumentContentDTO dto = new com.markdown.editor.dto.DocumentContentDTO();
        dto.setId(content.getId());
        dto.setDocumentId(content.getDocumentId());
        dto.setContent(content.getContent());
        dto.setHtmlContent(content.getHtmlContent());
        dto.setCreatedAt(content.getCreatedAt());
        dto.setUpdatedAt(content.getUpdatedAt());
        
        return Result.success("获取文档内容成功", dto);
    }
    
    @PutMapping("/{id}/content")
    public Result<com.markdown.editor.dto.DocumentContentDTO> saveDocumentContent(@PathVariable Long id, @RequestBody SaveDocumentContentRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        com.markdown.editor.entity.Document document = documentService.getDocumentEntity(id, userId);
        
        documentContentService.updateContent(id, request.getContent(), "");
        
        com.markdown.editor.entity.DocumentContent content = documentContentService.getContent(id);
        com.markdown.editor.dto.DocumentContentDTO dto = new com.markdown.editor.dto.DocumentContentDTO();
        dto.setId(content.getId());
        dto.setDocumentId(content.getDocumentId());
        dto.setContent(content.getContent());
        dto.setHtmlContent(content.getHtmlContent());
        dto.setCreatedAt(content.getCreatedAt());
        dto.setUpdatedAt(content.getUpdatedAt());
        
        return Result.success("保存文档内容成功", dto);
    }
    
    public static class SaveDocumentContentRequest {
        private String content;
        
        public String getContent() {
            return content;
        }
        
        public void setContent(String content) {
            this.content = content;
        }
    }
}
