package com.markdown.editor.utils;

import com.markdown.editor.entity.User;
import com.markdown.editor.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {
    
    private final UserService userService;
    
    public SecurityUtil(UserService userService) {
        this.userService = userService;
    }
    
    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return authentication.getName();
    }
    
    public User getCurrentUser() {
        String username = getCurrentUsername();
        if (username == null) {
            return null;
        }
        return userService.getCurrentUser(username) != null ? 
               userService.getUserById(userService.getCurrentUser(username).getId()) : null;
    }
    
    public Long getCurrentUserId() {
        User user = getCurrentUser();
        return user != null ? user.getId() : null;
    }
}
