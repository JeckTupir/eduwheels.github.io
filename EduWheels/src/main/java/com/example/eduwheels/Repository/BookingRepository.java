package com.example.eduwheels.Repository;

import com.example.eduwheels.Entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    // Add custom queries if needed (e.g., findByUserID, etc.)
}
