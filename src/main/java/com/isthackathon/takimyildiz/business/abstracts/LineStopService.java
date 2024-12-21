package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.entities.LineStop;

import java.util.UUID;

public interface LineStopService {

    DataResult<LineStop> getLineStopById(UUID lineStopId);


}
