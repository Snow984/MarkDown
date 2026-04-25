package com.markdown.editor.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("share_links")
public class ShareLink extends BaseEntity {
    
    private Long documentId;
    
    private String shareCode;
    
    private Integer permission;
    
    private LocalDateTime expireTime;
    
    private Integer viewCount;
    
    private Long createdBy;
}
