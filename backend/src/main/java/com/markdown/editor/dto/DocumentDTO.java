package com.markdown.editor.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DocumentDTO {
    
    private Long id;
    
    private String title;
    
    private String description;
    
    private String content;
    
    private String htmlContent;
    
    private Long userId;
    
    private Long folderId;
    
    private Integer status;
    
    private Integer version;
    
    private Integer wordCount;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
