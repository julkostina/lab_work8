package com.example.lab_work8;

public class Task {
    private String name;
    private boolean isCompleted=false;
    public Task(String name){
        this.name=name;

    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public String getName() {
        return name;
    }
}
