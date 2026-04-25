package com.markdown.editor.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.markdown.editor.entity.DocumentContent;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DocumentContentRepository extends BaseMapper<DocumentContent> {
}
