package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    Result registerUser(User user);

    DataResult<String> login(User user);

}
