package com.Devmountain.photoCollect2.controllers;


import com.Devmountain.photoCollect2.dtos.UserDto;
import com.Devmountain.photoCollect2.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public List<String> addUser(@RequestBody UserDto userDto){
        String passHash = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(passHash);
        return userService.addUser(userDto);
    }

    @PostMapping("/login")
    public List<String> userLogin(@RequestBody UserDto userDto){
        return userService.userLogin(userDto);
    }
   @PutMapping("/headerUrl")
    public List<String> addChangeUserHeaderUrl(@RequestBody UserDto userdto) {return userService.updateUserHeaderUrl(userdto);}

}

