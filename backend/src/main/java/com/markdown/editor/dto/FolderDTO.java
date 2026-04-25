package com.markdown.editor.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FolderDTO {
    
    private Long id;
    
    private String name;
    
    private Long parentId;
    
    private Long userId;
    
    private Integer sortOrder;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
