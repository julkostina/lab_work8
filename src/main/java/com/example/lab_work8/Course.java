package com.example.lab_work8;
import java.util.ArrayList;
import java.util.List;

public class Course extends Object{
    private  String name ="";
    private String id;
    private  Teacher teacher= new Teacher("");
    private List<Student> students= new ArrayList<>();
    private List<Task> tasks = new ArrayList<>();

    public String getId() {
        return id;
    }

    public Course(String name, String id, Teacher teacher){
        this.name=name;
        this.id=id;
        this.teacher=teacher;
    }
    public Course(){}
    public String getName() {
        return name;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        if(!students.isEmpty())
        {
            for(Student student:  students){
                student.setTasks(tasks);
            }
        }
        this.tasks=tasks;
    }

    public List<Student> getStudents() {
        return students;
    }
    public void setStudents(List<Student> students){
        this.students=students;
    }
}
