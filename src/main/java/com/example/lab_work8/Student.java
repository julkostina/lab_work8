package com.example.lab_work8;

import java.util.ArrayList;
import java.util.List;

public class Student {
    private String id;
    public Student(String id){
        this.id=id;
    }
//    public Teacher getTeacher() {
//        return teacher;
//    }

//    public void setTeacher(Teacher teacher) {
//        this.teacher = teacher;
//    }

    public String getId() {
        return id;
    }

    private List<Task> tasks = new ArrayList<>();
    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
