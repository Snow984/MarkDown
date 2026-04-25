package com.markdown.editor.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class CreateShareLinkRequest {
    
    private Integer permission = 1;
    
    @Min(value = 1, message = "有效期至少1小时")
    private Integer expireHours = 24;
}
