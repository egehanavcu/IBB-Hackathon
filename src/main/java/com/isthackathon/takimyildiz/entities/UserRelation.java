package com.isthackathon.takimyildiz.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "user_relations")
public class UserRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    private User parent;

    @ManyToOne
    @JoinColumn(name = "child_id", nullable = false)
    private User child;


}
