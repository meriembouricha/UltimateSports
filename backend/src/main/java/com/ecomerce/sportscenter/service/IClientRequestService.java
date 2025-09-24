package com.ecomerce.sportscenter.service;

import com.ecomerce.sportscenter.entity.ClientRequest;

import java.util.List;
import java.util.Map;

public interface IClientRequestService {
    public ClientRequest addClientRequest(ClientRequest clientRequest);
    List<Map<String, Object>> getRequestsPerDay();
    public Long getTotalRequests();
    public List<Map<String, Object>> getRequestsByTheme();
    public List<Map<String, Object>> getRequestsByHour();
    public List<Map<String, Object>> getResolutionStats();
}
