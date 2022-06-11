package com.Devmountain.photoCollect2.services;

import com.Devmountain.photoCollect2.dtos.UserDto;

import java.util.List;

public interface UserService {
    List<String> addUser(UserDto userDto);

    List<String> userLogin(UserDto userDto);
}
