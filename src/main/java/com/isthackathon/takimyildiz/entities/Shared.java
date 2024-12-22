package com.isthackathon.takimyildiz.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "share_start_time")
    private LocalDateTime shareStartTime;

    @Column(name = "share_end_time")
    private LocalDateTime shareEndTime;

    @Column(name = "share_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ShareType shareType;



}
