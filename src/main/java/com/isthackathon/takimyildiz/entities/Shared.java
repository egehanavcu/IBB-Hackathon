package com.isthackathon.takimyildiz.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "shared")
public class Shared {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "publisher_id")
    private User publisher;

    @ManyToOne
    @JoinColumn(name = "published_id")
    private User published;

    @ManyToOne
    @JoinColumn(name = "turnstile_id")
    private Turnstile turnstile;

    @Column(name = "is_active")
    private boolean is_active;

    @Column(name = "share_start_time")
    private LocalDateTime shareStartTime;

    @Column(name = "share_end_time")
    private LocalDateTime shareEndTime;


}
