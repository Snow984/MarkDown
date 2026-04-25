package com.markdown.editor.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.markdown.editor.entity.Document;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DocumentRepository extends BaseMapper<Document> {
}
