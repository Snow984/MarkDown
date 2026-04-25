package com.markdown.editor.service;

import org.springframework.stereotype.Service;

@Service
public class AIService {
    
    public String generateContent(String prompt, String context) {
        // 模拟AI生成内容
        return "基于您的输入，我生成了以下内容：" + prompt;
    }
    
    public String improveContent(String prompt, String context) {
        // 模拟AI润色内容
        return "润色后的内容：" + prompt;
    }
    
    public String summarizeContent(String prompt, String context) {
        // 模拟AI总结内容
        return "内容总结：" + prompt.substring(0, Math.min(prompt.length(), 100)) + "...";
    }
}
