package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserDao extends JpaRepository<User, UUID> {
    Optional<User> findByPhoneNumber(String phoneNumber);
}
