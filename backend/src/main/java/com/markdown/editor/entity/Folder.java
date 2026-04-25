package com.markdown.editor.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("folders")
public class Folder extends BaseEntity {
    
    private String name;
    
    private Long parentId;
    
    private Long userId;
    
    private Integer sortOrder;
}
