package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.UserRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRelationDao extends JpaRepository<UserRelation, UUID> {
}
