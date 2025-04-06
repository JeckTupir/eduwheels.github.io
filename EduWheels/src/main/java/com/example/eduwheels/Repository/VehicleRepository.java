package com.example.eduwheels.Repository;

import com.example.eduwheels.Entity.VehicleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<VehicleEntity, Long> {
    // You can add custom queries here later if needed
}
