package com.markdown.editor.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    
    private String nickname;
    private String avatar;
}
