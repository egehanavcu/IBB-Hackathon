package com.isthackathon.takimyildiz.business.concretes;

import com.isthackathon.takimyildiz.business.abstracts.*;
import com.isthackathon.takimyildiz.business.constants.ScheduleMessages;
import com.isthackathon.takimyildiz.core.results.*;
import com.isthackathon.takimyildiz.dataAccess.ParentScheduleDao;
import com.isthackathon.takimyildiz.entities.ParentSchedule;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleManager implements ScheduleService {

    private final ParentScheduleDao parentScheduleDao;

    private final UserService userService;

    private final SharedService sharedService;

    private final LineStopService lineStopService;

    private final LineService lineService;


    public ScheduleManager(ParentScheduleDao parentScheduleDao, UserService userService, SharedService sharedService, LineStopService lineStopService, LineService lineService) {
        this.parentScheduleDao = parentScheduleDao;
        this.userService = userService;
        this.sharedService = sharedService;
        this.lineStopService = lineStopService;
        this.lineService = lineService;
    }

    @Override
    public Result addSchedule(ParentSchedule parentSchedule) {
        if (parentSchedule.getDays() == null){
            return new ErrorResult(ScheduleMessages.dayCannotBeNull, HttpStatus.OK);
        }

        if (parentSchedule.getStartTime() == null){
            return new ErrorResult(ScheduleMessages.startTimeCannotBeNull, HttpStatus.OK);
        }

        if (parentSchedule.getEndTime() == null){
            return new ErrorResult(ScheduleMessages.endTimeCannotBeNull, HttpStatus.OK);
        }

        if (parentSchedule.getEnterStop() == null){
            return new ErrorResult(ScheduleMessages.enterStopCannotBeNull, HttpStatus.OK);
        }

        if (parentSchedule.getLeaveStop() == null){
            return new ErrorResult(ScheduleMessages.leaveStopCannotBeNull, HttpStatus.OK);
        }

        if (parentSchedule.getChild() == null){
            return new ErrorResult(ScheduleMessages.childCannotBeNull, HttpStatus.OK);
        }

        if (parentSchedule.getLine().getLineCode() == null){
            return new ErrorResult(ScheduleMessages.lineCannotBeNull, HttpStatus.OK);
        }

        var authenticatedUser = userService.getAuthenticatedUser();
        if (!authenticatedUser.isSuccess()){
            return new ErrorResult(authenticatedUser.getMessage(), authenticatedUser.getHttpStatus());
        }

        var parent = authenticatedUser.getData();

        var childResult = userService.getUserById(parentSchedule.getChild().getId());

        if (!childResult.isSuccess()){
            return new ErrorResult(childResult.getMessage(), childResult.getHttpStatus());
        }

        var child = childResult.getData();

        if (!sharedService.checkIfParentOfChild(parent, child).isSuccess()){
            return new ErrorResult(ScheduleMessages.notParentOfChild, HttpStatus.UNAUTHORIZED);
        }

        parentSchedule.setChild(child);
        parentSchedule.setParent(parent);

        var lineResult = lineService.getLineByCode(parentSchedule.getLine().getLineCode());
        if (!lineResult.isSuccess()){
            return new ErrorResult(lineResult.getMessage(), lineResult.getHttpStatus());
        }

        parentSchedule.setLine(lineResult.getData());

        var enterStopResult = lineStopService.getLineStopById(parentSchedule.getEnterStop().getId());
        if (!enterStopResult.isSuccess()){
            return new ErrorResult(enterStopResult.getMessage(), enterStopResult.getHttpStatus());
        }

        var exitStopResult = lineStopService.getLineStopById(parentSchedule.getLeaveStop().getId());
        if (!exitStopResult.isSuccess()){
            return new ErrorResult(exitStopResult.getMessage(), exitStopResult.getHttpStatus());
        }

        parentSchedule.setEnterStop(enterStopResult.getData());
        parentSchedule.setLeaveStop(exitStopResult.getData());

        parentScheduleDao.save(parentSchedule);

        return new SuccessResult(ScheduleMessages.scheduleAdded, HttpStatus.CREATED);

    }

    @Override
    public DataResult<List<ParentSchedule>> getSchedulesOfAuthenticatedParent() {
        var authenticatedUser = userService.getAuthenticatedUser();
        if (!authenticatedUser.isSuccess()){
            return new ErrorDataResult<>(authenticatedUser.getMessage(), authenticatedUser.getHttpStatus());
        }

        var parent = authenticatedUser.getData();

        var schedules = parentScheduleDao.findAllByParent(parent);

        return new SuccessDataResult<>(schedules, ScheduleMessages.schedulesListed, HttpStatus.OK);
    }

    @Override
    public DataResult<List<ParentSchedule>> getSchedulesOfAuthenticatedChild() {
        var authenticatedUser = userService.getAuthenticatedUser();
        if (!authenticatedUser.isSuccess()){
            return new ErrorDataResult<>(authenticatedUser.getMessage(), authenticatedUser.getHttpStatus());
        }

        var child = authenticatedUser.getData();

        var schedules = parentScheduleDao.findAllByChild(child);

        return new SuccessDataResult<>(schedules, ScheduleMessages.schedulesListed, HttpStatus.OK);
    }
}
