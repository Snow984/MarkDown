package com.markdown.editor.controller;

import com.markdown.editor.common.Result;
import com.markdown.editor.dto.LoginRequest;
import com.markdown.editor.dto.LoginResponse;
import com.markdown.editor.dto.RegisterRequest;
import com.markdown.editor.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final UserService userService;
    
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/register")
    public Result<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse response = userService.register(request);
        return Result.success("注册成功", response);
    }
    
    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return Result.success("登录成功", response);
    }
    
    @PostMapping("/logout")
    public Result<Void> logout() {
        return Result.success("注销成功", null);
    }
}
