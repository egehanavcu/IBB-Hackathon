package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.ParentSchedule;

import java.util.List;

public interface ScheduleService {
    Result addSchedule(ParentSchedule parentSchedule);

    DataResult<List<ParentSchedule>> getSchedulesOfAuthenticatedParent();

    DataResult<List<ParentSchedule>> getSchedulesOfAuthenticatedChild();

}
