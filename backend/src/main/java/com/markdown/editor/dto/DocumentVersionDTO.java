package com.markdown.editor.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DocumentVersionDTO {
    
    private Long id;
    
    private Long documentId;
    
    private Integer versionNumber;
    
    private String content;
    
    private String htmlContent;
    
    private String changeLog;
    
    private Long createdBy;
    
    private LocalDateTime createdAt;
}
