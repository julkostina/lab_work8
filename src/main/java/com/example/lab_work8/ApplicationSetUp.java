package com.example.lab_work8;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import java.util.Objects;
import java.util.UUID;
import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;


public class ApplicationSetUp {
    private String FILE = "Courses.json";
    private List<Course> courses = new ArrayList<>();

    public List<Course> getCourses() {
        return courses;
    }

    //{
    //  "course1": {
    //    "teacher": "",
    //    "students": [],
    //    "tasks": []
    //  }
    //
    //}
    public ApplicationSetUp(){
        this.courses= readCourses()==null? new ArrayList<>(): readCourses();
    }
    public Course addCoursesForStudent(Student student,String courseId)  {
        Course currentCourse = new Course();
        for(Course findCourse: courses){
            if(Objects.equals(courseId, findCourse.getId())&& !findCourse.getStudents().contains(student)){
                findCourse.getStudents().add(student);
                currentCourse = findCourse;
                saveCourses();
            }
        }
        return currentCourse;
    }
    public Course addCourseForTeacher(String name, Teacher teacher)  {
        Course newCourse = new Course(name, UUID.randomUUID().toString(), teacher);
        if( !courses.contains(newCourse)){
            courses.add(newCourse);
            saveCourses();
            return newCourse;
        }
    return null;
    }
    public List<Course> coursesOfTeacher(String id){
        List<Course> coursesOfTeacher = new ArrayList<>();
        if(courses==null){
            return null;
        }
        for(Course course: courses){
           if(Objects.equals(course.getTeacher().getId(), id)){
               coursesOfTeacher.add(course);
           }
        }
        return coursesOfTeacher;
    }
    public List<Course> coursesOfStudent(String id){
        List<Course> coursesOfStudent = new ArrayList<>();
        if(courses==null){
            return null;
        }
        for(Course course: courses){
            if(!course.getStudents().isEmpty()){
                for(Student student : course.getStudents()){
                    if(Objects.equals(id, student.getId())){
                        coursesOfStudent.add(course);
                    }
                }
            }
        }
        return coursesOfStudent;
    }
    public void addTask(Course course, Task task){
        if(courses.contains(course)){
            course.getTasks().add(task);
            saveCourses();
        }

    }

    public void completeTask(String name, Course course){
        for (Task task : course.getTasks()) {
            if (task.getName().equals(name)) {
                task.setCompleted(true);
                break;
            }
        }
        saveCourses();
    }
    private List<Course> readCourses() {
        Type REVIEW_TYPE = new TypeToken<List<Course>>() {
        }.getType();
        Gson gson = new Gson();
        JsonReader reader = null;
        try {
            reader = new JsonReader(new FileReader(FILE));
        } catch (FileNotFoundException e) {
            saveCourses();
            return courses;
        }
        return gson.fromJson(reader, REVIEW_TYPE);
    }
    private void saveCourses() {
        try (Writer writer = new FileWriter(FILE)) {
            Gson gson = new GsonBuilder().create();
            gson.toJson(courses, writer);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
