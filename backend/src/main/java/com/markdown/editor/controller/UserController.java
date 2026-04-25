package com.markdown.editor.controller;

import com.markdown.editor.common.Result;
import com.markdown.editor.dto.UpdateUserRequest;
import com.markdown.editor.dto.UserDTO;
import com.markdown.editor.service.UserService;
import com.markdown.editor.utils.SecurityUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    private final SecurityUtil securityUtil;
    
    public UserController(UserService userService, SecurityUtil securityUtil) {
        this.userService = userService;
        this.securityUtil = securityUtil;
    }
    
    @GetMapping("/me")
    public Result<UserDTO> getCurrentUser() {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return Result.error("未登录");
        }
        UserDTO user = userService.getCurrentUser(userId);
        return Result.success(user);
    }
    
    @PutMapping("/me")
    public Result<UserDTO> updateCurrentUser(@RequestBody UpdateUserRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return Result.error("未登录");
        }
        UserDTO updatedUser = userService.updateCurrentUser(userId, request);
        return Result.success("更新成功", updatedUser);
    }
}
