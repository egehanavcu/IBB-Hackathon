package com.isthackathon.takimyildiz.business.concretes;

import com.isthackathon.takimyildiz.business.abstracts.LineService;
import com.isthackathon.takimyildiz.business.abstracts.LineStopService;
import com.isthackathon.takimyildiz.business.constants.LineStopMessages;
import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.ErrorDataResult;
import com.isthackathon.takimyildiz.core.results.SuccessDataResult;
import com.isthackathon.takimyildiz.dataAccess.LineStopRelationDao;
import com.isthackathon.takimyildiz.entities.LineStop;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LineStopManager implements LineStopService {

    private final LineStopRelationDao lineStopRelationDao;
    private final LineService lineService;

    public LineStopManager(LineStopRelationDao lineStopRelationDao, LineService lineService) {
        this.lineStopRelationDao = lineStopRelationDao;
        this.lineService = lineService;
    }

    @Override
    public DataResult<LineStop> getLineStopById(UUID lineStopId) {
        var lineStop = lineStopRelationDao.findById(lineStopId);
        if (lineStop.isEmpty()) {
            return new ErrorDataResult<>(LineStopMessages.lineStopNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(lineStop.get(), LineStopMessages.lineStopListed, HttpStatus.OK);
    }

    @Override
    public DataResult<List<LineStop>> getStopsByLineCode(String lineCode) {
        var lineResult = lineService.getLineByCode(lineCode);
        if (!lineResult.isSuccess()) {
            return new ErrorDataResult<>(lineResult.getMessage(), lineResult.getHttpStatus());
        }

        var stops = lineStopRelationDao.findLineStopsByLineId(lineResult.getData().getId());
        if (stops.isEmpty()) {
            return new ErrorDataResult<>(LineStopMessages.lineStopNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(stops, LineStopMessages.lineStopListed, HttpStatus.OK);
    }
}
