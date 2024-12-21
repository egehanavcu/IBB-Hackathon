package com.isthackathon.takimyildiz.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "istanbulcard_id")
    private String istanbulCardId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @JsonIgnore
    @Column(name = "password")
    private String password;


    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @JoinTable(name = "authorities", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<Role> authorities;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Turnstile> turnstiles;

    @JsonIgnore
    @OneToMany(mappedBy = "publisher")
    private List<Shared> publisherShareds;

    @JsonIgnore
    @OneToMany(mappedBy = "published")
    private List<Shared> publishedShareds;

    @JsonIgnore
    @OneToMany(mappedBy = "parent")
    private List<UserRelation> childrenRelations;

    @JsonIgnore
    @OneToMany(mappedBy = "child")
    private List<UserRelation> parentRelations;

    @JsonIgnore
    @OneToMany(mappedBy = "parent")
    private List<ParentSchedule> parentSchedules;

    @JsonIgnore
    @OneToMany(mappedBy = "child")
    private List<ParentSchedule> childSchedules;


    @Override
    public String getUsername() {
        return id.toString();
    }
}
