package com.markdown.editor.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("users")
public class User extends BaseEntity {
    
    private String username;
    
    private String email;
    
    private String password;
    
    private String nickname;
    
    private String avatar;
    
    private Integer status;
}
