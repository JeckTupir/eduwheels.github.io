package com.example.eduwheels.Controller;

import com.example.eduwheels.Entity.VehicleEntity;
import com.example.eduwheels.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

import java.io.IOException;
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
        return (vehicle != null)
                ? ResponseEntity.ok(vehicle)
                : ResponseEntity.notFound().build();
    }

    // Create a new vehicle (JSON)
    @PostMapping
    public VehicleEntity createVehicle(@RequestBody VehicleEntity vehicle) {
        return vehicleService.createVehicle(vehicle);
    }

    // Update an existing vehicle (JSON)
    @PutMapping("/{id}")
    public ResponseEntity<VehicleEntity> updateVehicle(
            @PathVariable Long id,
            @RequestBody VehicleEntity updatedVehicle) {
        VehicleEntity vehicle = vehicleService.updateVehicle(id, updatedVehicle);
        return (vehicle != null)
                ? ResponseEntity.ok(vehicle)
                : ResponseEntity.notFound().build();
    }

    // Delete a vehicle
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        boolean deleted = vehicleService.deleteVehicle(id);
        return (deleted)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // Create a new vehicle with photo upload
    @PostMapping(
            path = "/withPhoto",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<VehicleEntity> createVehicleWithPhoto(
            @RequestParam String plateNumber,
            @RequestParam String type,
            @RequestParam int capacity,
            @RequestParam String status,
            @RequestParam("photo") MultipartFile photo) {
        try {
            String photoPath = null;
            if (photo != null && !photo.isEmpty()) {
                photoPath = vehicleService.saveImageToFilesystem(photo);
            }
            VehicleEntity vehicle = new VehicleEntity(plateNumber, type, capacity, status, photoPath);
            VehicleEntity created = vehicleService.createVehicle(vehicle);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IOException ex) {
            // Log stacktrace
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Update Vehicle with Photo
    @PutMapping(
            path = "/updateWithPhoto/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<VehicleEntity> updateVehicleWithPhoto(
            @PathVariable Long id,
            @RequestParam String plateNumber,
            @RequestParam String type,
            @RequestParam int capacity,
            @RequestParam String status,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {
        try {
            VehicleEntity existing = vehicleService.getVehicleById(id);
            if (existing == null) {
                return ResponseEntity.notFound().build();
            }
            existing.setPlateNumber(plateNumber);
            existing.setType(type);
            existing.setCapacity(capacity);
            existing.setStatus(status);
            if (photo != null && !photo.isEmpty()) {
                String photoPath = vehicleService.saveImageToFilesystem(photo);
                existing.setPhotoPath(photoPath);
            }
            VehicleEntity updated = vehicleService.updateVehicle(id, existing);
            return ResponseEntity.ok(updated);
        } catch (IOException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path uploadDir = Paths.get("uploads");
            Path file = uploadDir.resolve(filename);
            if (Files.exists(file)) {
                Resource resource = new UrlResource(file.toUri());
                String contentType = Files.probeContentType(file);
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}