package com.isthackathon.takimyildiz.entities;

public enum ShareType {

    PARENT("PARENT"),
    FRIEND("FRIEND");

    private String value;

    ShareType(String value) {
        this.value = value;
    }

    public String getValue(){
        return value;
    }
}
