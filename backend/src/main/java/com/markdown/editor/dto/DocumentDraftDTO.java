package com.markdown.editor.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DocumentDraftDTO {
    
    private Long id;
    
    private Long documentId;
    
    private Long userId;
    
    private String title;
    
    private String content;
    
    private String htmlContent;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
}
