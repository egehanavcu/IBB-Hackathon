package com.isthackathon.takimyildiz.business.abstracts;

import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.entities.Line;

import java.util.List;

public interface LineService {
    DataResult<Line> getLineByCode(String lineCode);

    DataResult<List<Line>> getAllLines();

}
