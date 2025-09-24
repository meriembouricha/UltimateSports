package com.ecomerce.sportscenter.repository;

import com.ecomerce.sportscenter.entity.ClientRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRequestRepository extends JpaRepository<ClientRequest, Integer> {
    @Query("SELECT DATE(s.requestTime) as requestDate, COUNT(s) as requestCount " +
            "FROM ClientRequest s GROUP BY DATE(s.requestTime)")
    List<Object[]> getRequestsPerDay();

    @Query("SELECT COUNT(s) FROM ClientRequest s")
    Long getTotalRequests();

    @Query("SELECT s.theme, COUNT(s) as themeCount " +
            "FROM ClientRequest s GROUP BY s.theme ORDER BY themeCount DESC")
    List<Object[]> getRequestsByTheme();

    @Query("SELECT HOUR(s.requestTime) as hour, COUNT(s) as requestCount " +
            "FROM ClientRequest s GROUP BY HOUR(s.requestTime)")
    List<Object[]> getRequestsByHour();

    @Query("SELECT s.isResolved, COUNT(s) as resolutionCount " +
            "FROM ClientRequest s GROUP BY s.isResolved")
    List<Object[]> getResolutionStats();
}
