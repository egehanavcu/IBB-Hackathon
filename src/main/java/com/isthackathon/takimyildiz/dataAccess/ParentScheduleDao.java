package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.ParentSchedule;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ParentScheduleDao extends JpaRepository<ParentSchedule, UUID> {
    List<ParentSchedule> findAllByParent(User parent);

    List<ParentSchedule> findAllByChild(User child);

}
