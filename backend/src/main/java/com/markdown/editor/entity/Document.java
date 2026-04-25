package com.markdown.editor.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("documents")
public class Document extends BaseEntity {
    
    private String title;
    
    private String description;
    
    private Long userId;
    
    private Long folderId;
    
    private Integer status;
    
    private Integer version;
    
    private Integer wordCount;
}
