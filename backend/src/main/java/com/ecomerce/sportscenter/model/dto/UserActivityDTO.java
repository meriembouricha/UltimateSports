package com.ecomerce.sportscenter.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserActivityDTO {
    private Long idLog;
    private LocalDateTime loginTime;
    private String username;
}
