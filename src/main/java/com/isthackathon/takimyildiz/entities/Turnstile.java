package com.isthackathon.takimyildiz.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "turnstiles")
public class Turnstile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "line_id")
    private Line line;

    @Column(name = "vehicle_code")
    private String vehicleCode;

    @ManyToOne
    @JoinColumn(name = "start_line_stop_id")
    private LineStop startLineStop;


    @Column(name = "has_exited")
    private boolean hasExited;


    @JsonIgnore
    @OneToMany(mappedBy = "turnstile")
    private List<Shared> shareds;



}
