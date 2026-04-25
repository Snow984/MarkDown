package com.markdown.editor.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.markdown.editor.entity.DocumentVersion;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DocumentVersionRepository extends BaseMapper<DocumentVersion> {
}
