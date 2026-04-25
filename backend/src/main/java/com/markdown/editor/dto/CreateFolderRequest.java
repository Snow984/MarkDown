package com.markdown.editor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateFolderRequest {
    
    @NotBlank(message = "文件夹名称不能为空")
    @Size(max = 100, message = "文件夹名称不能超过100个字符")
    private String name;
    
    private Long parentId;
    
    private Integer sortOrder = 0;
}
