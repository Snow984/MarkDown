package com.markdown.editor.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.markdown.editor.entity.Folder;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FolderRepository extends BaseMapper<Folder> {
}
