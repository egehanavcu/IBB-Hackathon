package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.UUID;

public interface UserService extends UserDetailsService {

    DataResult<User> getUserById(UUID userId);

    DataResult<User> getUserByPhoneNumber(String phoneNumber);

    Result addUser(User user);

    DataResult<List<User>> getAllUsers();

    DataResult<User> getAuthenticatedUser();

    Result assignIstanbulCardToUser(String istanbulCardId);


    DataResult<User> getUserByCardId(String cardId);
}
