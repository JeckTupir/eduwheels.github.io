package com.example.eduwheels.Service;

import com.example.eduwheels.Entity.ReportEntity;
import com.example.eduwheels.Repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    // Get all reports
    public List<ReportEntity> getAllReports() {
        return reportRepository.findAll();
    }

    // Get report by ID
    public Optional<ReportEntity> getReportById(Integer reportId) {
        return reportRepository.findById(reportId);
    }

    // Create or update a report
    public ReportEntity createReport(ReportEntity report) {
        return reportRepository.save(report);
    }

    // Delete report by ID
    public void deleteReport(Integer reportId) {
        reportRepository.deleteById(reportId);
    }
}
