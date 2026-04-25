package com.markdown.editor.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.markdown.editor.entity.ShareLink;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ShareLinkRepository extends BaseMapper<ShareLink> {
}
