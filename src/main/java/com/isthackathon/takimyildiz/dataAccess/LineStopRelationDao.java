package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.LineStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface LineStopRelationDao extends JpaRepository<LineStop, UUID> {

    @Query("SELECT r.lineStop FROM LineStopRelation r WHERE r.line.id = :lineId")
    List<LineStop> findLineStopsByLineId(UUID lineId);
}
