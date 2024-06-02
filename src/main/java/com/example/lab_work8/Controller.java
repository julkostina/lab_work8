package com.example.lab_work8;
import java.util.Map;
import java.util.Objects;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import com.google.gson.GsonBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

public class Controller {
    private final String ORIGIN = "http://localhost:3000";
    private final ApplicationSetUp app = new ApplicationSetUp();
    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping(path = "/teacherCourses", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = ORIGIN)
    public ResponseEntity<Object> teacherCourses(@RequestBody Map<String, Object> datamap) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        return new ResponseEntity<Object>(gson.toJson(app.coursesOfTeacher(datamap.get("idTeacher").toString())), HttpStatus.OK);
    }

    @PostMapping(path = "/studentCourses", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = ORIGIN)
    public ResponseEntity<Object> studentCourses(@RequestBody Map<String, Object> datamap) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        return new ResponseEntity<Object>(gson.toJson(app.coursesOfStudent(datamap.get("idStudent").toString())), HttpStatus.OK);
    }
//
//    @PostMapping(path = "/createCourse", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    @CrossOrigin(origins = ORIGIN)
//    public ResponseEntity<Object> createCourse(@RequestBody Map<String, Object> datamap) {
//        GsonBuilder builder = new GsonBuilder();
//        Gson gson = builder.create();
//        Course course = new Course(datamap.get("nameCourse").toString(), datamap.get("idCourse").toString(),new Teacher(datamap.get("teacherId").toString()));
//        return new ResponseEntity<Object>(gson.toJson(course), HttpStatus.OK);
//    }

    @PostMapping(path = "/enrollCourse", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = ORIGIN)
    public ResponseEntity<Object> enrollCourse(@RequestBody Map<String, Object> datamap) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        Course course = app.addCoursesForStudent(new Student(datamap.get("idStudent").toString()), datamap.get("idCourse").toString());
        return new ResponseEntity<Object>(gson.toJson(course), HttpStatus.OK);
    }

    @PostMapping(path = "/createCourse", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = ORIGIN)
    public ResponseEntity<Object> teachCourse(@RequestBody Map<String, Object> datamap) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        Course course = app.addCourseForTeacher(datamap.get("nameCourse").toString(),new Teacher(datamap.get("idTeacher").toString()) );
        return new ResponseEntity<Object>(gson.toJson( app.getCourses()), HttpStatus.OK);
    }

    @PostMapping(path = "/createTask", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = ORIGIN)
    public ResponseEntity<Object> createTask(@RequestBody Map<String, Object> datamap) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        Course  curCourse =new Course();
        for(Course course: app.getCourses()){
            if(Objects.equals(datamap.get("idCourse").toString(), course.getId())){
                curCourse=course;
            }
        }
        app.addTask(curCourse,new Task(datamap.get("nameTask").toString()));
        return new ResponseEntity<Object>(gson.toJson(curCourse), HttpStatus.OK);
    }

    @PostMapping(path = "/completeTask", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = ORIGIN)
    public ResponseEntity<Object> completeTask(@RequestBody Map<String, Object> datamap) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        Course  curCourse =new Course();
        for(Course course: app.getCourses()){
            if(Objects.equals(datamap.get("idCourse").toString(), course.getId())){
                curCourse=course;
            }
        }
        app.completeTask(datamap.get("nameTask").toString(), curCourse);
        return new ResponseEntity<Object>(gson.toJson(curCourse), HttpStatus.OK);
    }
}
