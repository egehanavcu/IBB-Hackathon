package com.isthackathon.takimyildiz.business.concretes;

import com.isthackathon.takimyildiz.business.abstracts.LineService;
import com.isthackathon.takimyildiz.business.constants.LineMessages;
import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.ErrorDataResult;
import com.isthackathon.takimyildiz.core.results.SuccessDataResult;
import com.isthackathon.takimyildiz.dataAccess.LineDao;
import com.isthackathon.takimyildiz.entities.Line;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LineManager implements LineService {

    private final LineDao lineDao;

    public LineManager(LineDao lineDao) {
        this.lineDao = lineDao;
    }

    @Override
    public DataResult<Line> getLineByCode(String lineCode) {

        var line = lineDao.findByLineCode(lineCode);
        if (!line.isPresent()){
            return new ErrorDataResult<>(LineMessages.lineNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(line.get(), LineMessages.lineListed, HttpStatus.OK);

    }

    @Override
    public DataResult<List<Line>> getAllLines() {

        var lines = lineDao.findAll();

        if (lines.isEmpty()){
            return new ErrorDataResult<>(LineMessages.linesNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(lines, LineMessages.linesListed, HttpStatus.OK);
    }
}
