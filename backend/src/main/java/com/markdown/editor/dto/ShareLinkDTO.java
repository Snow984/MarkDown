package com.markdown.editor.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ShareLinkDTO {
    
    private Long id;
    
    private Long documentId;
    
    private String shareCode;
    
    private Integer permission;
    
    private LocalDateTime expireTime;
    
    private Integer viewCount;
    
    private Long createdBy;
    
    private LocalDateTime createdAt;
}
