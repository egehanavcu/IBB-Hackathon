package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.Turnstile;

import java.util.List;
import java.util.UUID;

public interface TurnstileService {


    DataResult<List<Turnstile>> getTurnstilesOfAuthenticatedUser();

    Result passCard(String vehicleCode, String cardId, String lineCode);

    Result leaveVehicle(String vehicleCode);

    DataResult<List<Turnstile>> getTurnstilesByUserId(UUID id);

    DataResult<List<Turnstile>> getSharedTurnstiles(UUID publisherId);
}
