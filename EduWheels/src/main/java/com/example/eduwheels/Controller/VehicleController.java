package com.example.eduwheels.Controller;

import com.example.eduwheels.Entity.VehicleEntity;
import com.example.eduwheels.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // Get all vehicles
    @GetMapping
    public List<VehicleEntity> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // Get a vehicle by ID
    @GetMapping("/{id}")
    public ResponseEntity<VehicleEntity> getVehicleById(@PathVariable Long id) {
        VehicleEntity vehicle = vehicleService.getVehicleById(id);
        if (vehicle != null) {
            return ResponseEntity.ok(vehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new vehicle
    @PostMapping
    public VehicleEntity createVehicle(@RequestBody VehicleEntity vehicle) {
        return vehicleService.createVehicle(vehicle);
    }

    // Update an existing vehicle
    @PutMapping("/{id}")
    public ResponseEntity<VehicleEntity> updateVehicle(@PathVariable Long id, @RequestBody VehicleEntity updatedVehicle) {
        VehicleEntity vehicle = vehicleService.updateVehicle(id, updatedVehicle);
        if (vehicle != null) {
            return ResponseEntity.ok(vehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a vehicle
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        boolean deleted = vehicleService.deleteVehicle(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
