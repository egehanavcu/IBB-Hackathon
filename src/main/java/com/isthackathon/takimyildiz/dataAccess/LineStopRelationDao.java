package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.LineStopRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LineStopRelationDao extends JpaRepository<LineStopRelation, UUID> {
}
