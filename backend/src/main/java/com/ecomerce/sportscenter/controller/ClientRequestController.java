package com.ecomerce.sportscenter.controller;

import com.ecomerce.sportscenter.entity.ClientRequest;
import com.ecomerce.sportscenter.service.IClientRequestService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ClientRequestController {
    IClientRequestService clientRequestService;

    @PostMapping("/addStudentRequest")
    public ClientRequest addStudentRequest(ClientRequest studentRequest) {
        return clientRequestService.addClientRequest(studentRequest);
    }

    @GetMapping("/per-day")
    public List<Map<String, Object>> getRequestsPerDay() {
        return clientRequestService.getRequestsPerDay();
    }

    @GetMapping("/total")
    public Long getTotalRequests() {
        return clientRequestService.getTotalRequests();
    }

    @GetMapping("/by-theme")
    public List<Map<String, Object>> getRequestsByTheme() {
        return clientRequestService.getRequestsByTheme();
    }

    @GetMapping("/by-hour")
    public List<Map<String, Object>> getRequestsByHour() {
        return clientRequestService.getRequestsByHour();
    }

    @GetMapping("/resolution-stats")
    public List<Map<String, Object>> getResolutionStats() {
        return clientRequestService.getResolutionStats();
    }

}
