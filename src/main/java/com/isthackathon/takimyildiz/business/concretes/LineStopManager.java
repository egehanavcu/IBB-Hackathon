package com.isthackathon.takimyildiz.business.concretes;

import com.isthackathon.takimyildiz.business.abstracts.LineStopService;
import com.isthackathon.takimyildiz.business.constants.LineStopMessages;
import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.ErrorDataResult;
import com.isthackathon.takimyildiz.core.results.SuccessDataResult;
import com.isthackathon.takimyildiz.dataAccess.LineStopDao;
import com.isthackathon.takimyildiz.entities.LineStop;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LineStopManager implements LineStopService {


    private final LineStopDao lineStopDao;


    public LineStopManager(LineStopDao lineStopDao) {
        this.lineStopDao = lineStopDao;
    }

    @Override
    public DataResult<LineStop> getLineStopById(UUID lineStopId) {

        var lineStop = lineStopDao.findById(lineStopId);

        if (lineStop.isEmpty()){
            return new ErrorDataResult<>(LineStopMessages.lineStopNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(lineStop.get(), LineStopMessages.lineStopListed, HttpStatus.OK);
    }
}
