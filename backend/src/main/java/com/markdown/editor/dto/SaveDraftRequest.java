package com.markdown.editor.dto;

import lombok.Data;

@Data
public class SaveDraftRequest {
    
    private Long documentId;
    
    private String title;
    
    private String content;
}
