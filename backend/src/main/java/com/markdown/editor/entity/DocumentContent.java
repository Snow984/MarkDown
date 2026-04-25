package com.markdown.editor.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("document_contents")
public class DocumentContent extends BaseEntity {
    
    private Long documentId;
    
    private String content;
    
    private String htmlContent;
}
