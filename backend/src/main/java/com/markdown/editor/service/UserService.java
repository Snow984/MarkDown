package com.markdown.editor.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.markdown.editor.dto.LoginRequest;
import com.markdown.editor.dto.LoginResponse;
import com.markdown.editor.dto.RegisterRequest;
import com.markdown.editor.dto.UpdateUserRequest;
import com.markdown.editor.dto.UserDTO;
import com.markdown.editor.entity.User;
import com.markdown.editor.repository.UserRepository;
import com.markdown.editor.utils.JwtUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    
    @Transactional
    public LoginResponse register(RegisterRequest request) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername, request.getUsername())
                .or()
                .eq(User::getEmail, request.getEmail());
        
        if (userRepository.selectCount(wrapper) > 0) {
            throw new RuntimeException("用户名或邮箱已存在");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getNickname() != null && !request.getNickname().isEmpty() ? request.getNickname() : request.getUsername());
        user.setStatus(1);
        
        userRepository.insert(user);
        
        String token = jwtUtil.generateToken(user.getUsername());
        UserDTO userDTO = convertToDTO(user);
        
        return new LoginResponse(token, userDTO);
    }
    
    public LoginResponse login(LoginRequest request) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername, request.getUsername());
        
        User user = userRepository.selectOne(wrapper);
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("用户名或密码错误");
        }
        
        if (user.getStatus() != 1) {
            throw new RuntimeException("用户已被禁用");
        }
        
        String token = jwtUtil.generateToken(user.getUsername());
        UserDTO userDTO = convertToDTO(user);
        
        return new LoginResponse(token, userDTO);
    }
    
    public UserDTO getCurrentUser(Long userId) {
        User user = userRepository.selectById(userId);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        return convertToDTO(user);
    }
    
    public UserDTO getCurrentUser(String username) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername, username);
        User user = userRepository.selectOne(wrapper);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        return convertToDTO(user);
    }
    
    public User getUserById(Long userId) {
        return userRepository.selectById(userId);
    }
    
    @Transactional
    public UserDTO updateCurrentUser(Long userId, UpdateUserRequest request) {
        User user = userRepository.selectById(userId);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        
        if (request.getNickname() != null) {
            user.setNickname(request.getNickname());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        
        userRepository.updateById(user);
        return convertToDTO(user);
    }
    
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        BeanUtils.copyProperties(user, dto);
        return dto;
    }
}
