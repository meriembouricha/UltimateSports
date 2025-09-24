package com.ecomerce.sportscenter.service;

import com.ecomerce.sportscenter.entity.ClientRequest;
import com.ecomerce.sportscenter.repository.ClientRequestRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Primary
@Slf4j
@AllArgsConstructor
public class ClientRequestServiceImpl implements IClientRequestService{

    private ClientRequestRepository clientRequestRepository;

    @Override
    public ClientRequest addClientRequest(ClientRequest clientRequest) {
        return clientRequestRepository.save(clientRequest);
    }

    @Override
    public List<Map<String, Object>> getRequestsPerDay() {
        return clientRequestRepository.getRequestsPerDay().stream()
                .map(row -> {
                    java.sql.Date sqlDate = (java.sql.Date) row[0];
                    String formattedDate = sqlDate.toString(); // Format YYYY-MM-DD
                    return Map.of("date", formattedDate, "count", row[1]);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Long getTotalRequests() {
        return clientRequestRepository.getTotalRequests();
    }

    @Override
    public List<Map<String, Object>> getRequestsByTheme() {
        return clientRequestRepository.getRequestsByTheme().stream()
                .map(row -> Map.of("theme", row[0].toString(), "count", row[1]))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> getRequestsByHour() {
        return  clientRequestRepository.getRequestsByHour().stream()
                .map(row -> Map.of("hour", row[0], "count", row[1]))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> getResolutionStats() {
        return clientRequestRepository.getResolutionStats().stream()
                .map(row -> Map.of("isResolved", row[0], "count", row[1]))
                .collect(Collectors.toList());
    }
}
