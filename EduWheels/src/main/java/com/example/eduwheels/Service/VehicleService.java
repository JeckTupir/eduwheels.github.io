package com.example.eduwheels.Service;

import com.example.eduwheels.Entity.VehicleEntity;
import com.example.eduwheels.Repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    // Get all vehicles
    public List<VehicleEntity> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Get vehicle by ID
    public VehicleEntity getVehicleById(Long id) {
        Optional<VehicleEntity> vehicle = vehicleRepository.findById(id);
        return vehicle.orElse(null);
    }

    // Create new vehicle
    public VehicleEntity createVehicle(VehicleEntity vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // Update vehicle
    public VehicleEntity updateVehicle(Long id, VehicleEntity updatedVehicle) {
        Optional<VehicleEntity> existingVehicleOpt = vehicleRepository.findById(id);
        if (existingVehicleOpt.isPresent()) {
            VehicleEntity existingVehicle = existingVehicleOpt.get();
            existingVehicle.setPlateNumber(updatedVehicle.getPlateNumber());
            existingVehicle.setType(updatedVehicle.getType());
            existingVehicle.setCapacity(updatedVehicle.getCapacity());
            existingVehicle.setStatus(updatedVehicle.getStatus());
            return vehicleRepository.save(existingVehicle);
        } else {
            return null;
        }
    }

    // Delete vehicle
    public boolean deleteVehicle(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
