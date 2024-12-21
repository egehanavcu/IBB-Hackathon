package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.Turnstile;

import java.util.List;

public interface TurnstileService {


    DataResult<List<Turnstile>> getTurnstilesOfAuthenticatedUser();

    Result passCard(String vehicleCode, String cardId, String lineCode);

    Result leaveVehicle(String vehicleCode);

}
