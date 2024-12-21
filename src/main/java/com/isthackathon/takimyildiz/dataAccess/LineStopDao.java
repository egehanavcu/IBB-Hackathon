package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.Line;
import com.isthackathon.takimyildiz.entities.LineStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LineStopDao extends JpaRepository<LineStop, UUID> {
}
