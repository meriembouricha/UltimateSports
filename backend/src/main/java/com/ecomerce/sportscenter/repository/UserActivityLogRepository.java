package com.ecomerce.sportscenter.repository;

import com.ecomerce.sportscenter.entity.UserActivityLog;
import com.ecomerce.sportscenter.model.dto.UserActivityDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UserActivityLogRepository extends JpaRepository<UserActivityLog, Long> {
    @Query("SELECT new com.ecomerce.sportscenter.model.dto.UserActivityDTO(a.idLog, a.loginTime, u.username) " +
            "FROM UserActivityLog a JOIN a.user u WHERE a.loginTime BETWEEN :start AND :end")
    List<UserActivityDTO> findUserActivityWithUsername(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
