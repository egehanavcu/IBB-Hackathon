package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.Turnstile;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TurnstileDao extends JpaRepository<Turnstile, UUID> {
    List<Turnstile> findAllByUser(User user);

    List<Turnstile> findByVehicleCodeAndHasExited(String vehicleCode, boolean hasExited);
}
