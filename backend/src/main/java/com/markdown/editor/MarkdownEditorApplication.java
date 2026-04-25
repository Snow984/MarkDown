package com.markdown.editor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MarkdownEditorApplication {

    public static void main(String[] args) {
        SpringApplication.run(MarkdownEditorApplication.class, args);
    }
}
