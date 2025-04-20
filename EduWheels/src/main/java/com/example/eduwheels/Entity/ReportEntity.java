package com.example.eduwheels.Entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
@Table(name = "tblreport")
public class ReportEntity {

    public enum ReportType {
        TRIP_HISTORY,
        VEHICLE_UTILIZATION,
        BOOKING_TRENDS
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reportID;

    private Integer generatedBy;

    @Enumerated(EnumType.STRING)
    private ReportType type;

    @Lob
    private String content;

    private LocalDateTime dateGenerated;

    // Getters
    public Integer getReportID() {
        return reportID;
    }

    public Integer getGeneratedBy() {
        return generatedBy;
    }

    public ReportType getType() {
        return type;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getDateGenerated() {
        return dateGenerated;
    }

    // Setters
    public void setReportID(Integer reportID) {
        this.reportID = reportID;
    }

    public void setGeneratedBy(Integer generatedBy) {
        this.generatedBy = generatedBy;
    }

    public void setType(ReportType type) {
        this.type = type;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDateGenerated(LocalDateTime dateGenerated) {
        this.dateGenerated = dateGenerated;
    }
}