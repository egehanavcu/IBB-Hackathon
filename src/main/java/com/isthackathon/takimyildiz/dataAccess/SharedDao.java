package com.isthackathon.takimyildiz.dataAccess;

import com.isthackathon.takimyildiz.entities.ShareType;
import com.isthackathon.takimyildiz.entities.Shared;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SharedDao extends JpaRepository<Shared, UUID> {
    List<Shared> findAllByPublisher(User publisher);

    List<Shared> findAllByPublished(User published);

    List<Shared> findAllByPublisherAndPublishedAndShareType(User publisher, User published, ShareType shareType);

    List<Shared> findAllByPublisherOrPublished(User user1, User user2);
}
