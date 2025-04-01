package com.example.eduwheels.Repository; // ✅ Ensure package name is lowercase

import com.example.eduwheels.Entity.userEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<userEntity, Long> {
    // ✅ Find user by schoolid
    Optional<userEntity> findBySchoolid(String schoolid);
}