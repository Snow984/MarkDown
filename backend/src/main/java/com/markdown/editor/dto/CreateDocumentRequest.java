package com.markdown.editor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateDocumentRequest {
    
    @NotBlank(message = "文档标题不能为空")
    @Size(max = 200, message = "文档标题不能超过200个字符")
    private String title;
    
    @Size(max = 500, message = "文档描述不能超过500个字符")
    private String description;
    
    private Long folderId;
    
    private String content;
}
