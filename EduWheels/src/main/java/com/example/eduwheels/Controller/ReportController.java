package com.example.eduwheels.Controller;
import com.example.eduwheels.Entity.ReportEntity;
import com.example.eduwheels.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping
    public List<ReportEntity> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/{id}")
    public Optional<ReportEntity> getReportById(@PathVariable Integer id) {
        return reportService.getReportById(id);
    }

    @PostMapping
    public ReportEntity createReport(@RequestBody ReportEntity report) {
        return reportService.createReport(report);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Integer id) {
        reportService.deleteReport(id);
    }
}

