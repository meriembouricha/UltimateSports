package com.ecomerce.sportscenter.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client_request")
public class ClientRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_request")
    private Long idRequest;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    @JsonBackReference
    private AppUser user;

    @Column(name = "request_time", nullable = false)
    private LocalDateTime requestTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme", nullable = false)
    private RequestTheme theme;

    @Column(name = "is_resolved", nullable = false)
    private boolean isResolved;


    public ClientRequest(AppUser user, LocalDateTime requestTime, RequestTheme theme, boolean isResolved) {
        this.user = user;
        this.requestTime = requestTime;
        this.theme = theme;
        this.isResolved = isResolved;
    }
}
