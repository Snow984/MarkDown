package com.markdown.editor.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateFolderRequest {
    
    @Size(max = 100, message = "文件夹名称不能超过100个字符")
    private String name;
    
    private Long parentId;
    
    private Integer sortOrder;
}
