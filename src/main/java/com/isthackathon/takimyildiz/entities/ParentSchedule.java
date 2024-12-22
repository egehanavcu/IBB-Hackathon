package com.isthackathon.takimyildiz.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "parent_schedule")
public class ParentSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;

    @ManyToOne
    @JoinColumn(name = "child_id")
    private User child;

    @ManyToOne
    @JoinColumn(name = "line_id")
    private Line line;

    @ManyToOne
    @JoinColumn(name = "enter_stop_id")
    private LineStop enterStop;

    @ManyToOne
    @JoinColumn(name = "leave_stop_id")
    private LineStop leaveStop;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;



    @ElementCollection(targetClass = Days.class, fetch = FetchType.EAGER)
    @JoinTable(name = "days_for_schedule", joinColumns = @JoinColumn(name = "parent_schedule_id"))
    @Column(name = "day", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<Days> days;


}
