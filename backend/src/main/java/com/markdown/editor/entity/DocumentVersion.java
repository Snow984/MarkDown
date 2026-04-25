package com.markdown.editor.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("document_versions")
public class DocumentVersion extends BaseEntity {
    
    private Long documentId;
    
    private Integer versionNumber;
    
    private String content;
    
    private String htmlContent;
    
    private String changeLog;
    
    private Long createdBy;
}
