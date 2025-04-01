package com.example.eduwheels.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.eduwheels.Repository.userRepository;
import com.example.eduwheels.Entity.userEntity;

import java.util.List;
import java.util.Optional;

@Service
public class userService {
    @Autowired
    private userRepository userRepository;

    public List<userEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<userEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public userEntity createUser(userEntity user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
