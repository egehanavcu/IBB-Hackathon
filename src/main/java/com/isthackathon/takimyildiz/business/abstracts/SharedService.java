package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.Shared;
import com.isthackathon.takimyildiz.entities.User;

import java.util.List;
import java.util.UUID;

public interface SharedService {

    Result addShared(Shared shared);

    DataResult<List<Shared>> getAllSharedsOfAuthenticatedUser();

    Result acceptShared(UUID sharedId);

    Result checkIfParentOfChild(User parent, User child);


}
