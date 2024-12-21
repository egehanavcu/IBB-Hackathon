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
@Table(name = "lines")
public class Line {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "line_name")
    private String lineName;

    @Column(name = "line_code")
    private String lineCode;

    @JsonIgnore
    @OneToMany(mappedBy = "line", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LineStopRelation> lineRelations;

    @JsonIgnore
    @OneToMany(mappedBy = "line")
    private List<Turnstile> turnstiles;
}
