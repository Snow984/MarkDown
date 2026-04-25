package com.markdown.editor.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {
    
    private final RestTemplate restTemplate;
    private final String OLLAMA_API_URL = "http://localhost:11434/api/generate";
    private final String MODEL = "qwen3.5";
    
    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public String generateContent(String prompt, String context) {
        String fullPrompt = "生成内容：" + prompt;
        if (context != null && !context.isEmpty()) {
            fullPrompt += "\n\n上下文：" + context;
        }
        return callOllamaAPI(fullPrompt);
    }
    
    public String improveContent(String prompt, String context) {
        String fullPrompt = "请润色以下内容，使其更加流畅、专业：\n" + prompt;
        if (context != null && !context.isEmpty()) {
            fullPrompt += "\n\n上下文：" + context;
        }
        return callOllamaAPI(fullPrompt);
    }
    
    public String summarizeContent(String prompt, String context) {
        String fullPrompt = "请总结以下内容，提取核心要点：\n" + prompt;
        if (context != null && !context.isEmpty()) {
            fullPrompt += "\n\n上下文：" + context;
        }
        return callOllamaAPI(fullPrompt);
    }
    
    private String callOllamaAPI(String prompt) {
        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", MODEL);
            requestBody.put("prompt", prompt);
            requestBody.put("stream", false);
            
            Map<String, Object> response = restTemplate.postForObject(
                OLLAMA_API_URL, 
                requestBody, 
                Map.class
            );
            
            if (response != null && response.containsKey("response")) {
                return response.get("response").toString();
            } else {
                return "AI 响应失败，请稍后重试";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "无法连接到 AI 服务，请确保 Ollama 已启动并运行 Qwen3.5 模型";
        }
    }
}
