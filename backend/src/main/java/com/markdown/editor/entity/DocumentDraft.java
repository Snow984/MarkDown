package com.markdown.editor.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("document_drafts")
public class DocumentDraft extends BaseEntity {
    
    private Long documentId;
    
    private Long userId;
    
    private String title;
    
    private String content;
    
    private String htmlContent;
}
