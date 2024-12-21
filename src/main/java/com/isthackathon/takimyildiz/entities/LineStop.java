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
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "line_stops")
public class LineStop {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "stop_name")
    private String stopName;

    @Column(name = "stop_code")
    private String stopCode;

    @Column(name = "location_x")
    private double locationX;

    @Column(name = "location_y")
    private double locationY;

    @JsonIgnore
    @OneToMany(mappedBy = "lineStop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LineStopRelation> lineRelations;

    @JsonIgnore
    @OneToMany(mappedBy = "enterStop")
    private List<ParentSchedule> enterStopsSchedules;

    @JsonIgnore
    @OneToMany(mappedBy = "leaveStop")
    private List<ParentSchedule> leaveStopsSchedules;
}
