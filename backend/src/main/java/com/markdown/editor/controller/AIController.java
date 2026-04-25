package com.markdown.editor.controller;

import com.markdown.editor.common.Result;
import com.markdown.editor.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {
    
    private final AIService aiService;
    
    public AIController(AIService aiService) {
        this.aiService = aiService;
    }
    
    @PostMapping("/generate")
    public Result<String> generate(@RequestBody AIRequest request) {
        String result = aiService.generateContent(request.getPrompt(), request.getContext());
        return Result.success("生成成功", result);
    }
    
    @PostMapping("/improve")
    public Result<String> improve(@RequestBody AIRequest request) {
        String result = aiService.improveContent(request.getPrompt(), request.getContext());
        return Result.success("润色成功", result);
    }
    
    @PostMapping("/summarize")
    public Result<String> summarize(@RequestBody AIRequest request) {
        String result = aiService.summarizeContent(request.getPrompt(), request.getContext());
        return Result.success("总结成功", result);
    }
    
    public static class AIRequest {
        private String prompt;
        private String context;
        
        public String getPrompt() {
            return prompt;
        }
        
        public void setPrompt(String prompt) {
            this.prompt = prompt;
        }
        
        public String getContext() {
            return context;
        }
        
        public void setContext(String context) {
            this.context = context;
        }
    }
}
