package com.AIML2A.Rest_Api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AIML2A.Rest_Api.model.Student;
import com.AIML2A.Rest_Api.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
    private StudentRepository repository;

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student saveStudent(Student student) {
        return repository.save(student);
    }
 // Method to handle PUT (Update)
    public Student updateStudent(int id, Student studentDetails) {
        // 1. Find the existing student
        return repository.findById(id).map(student -> {
            // 2. Update fields from the JSON body
            student.setName(studentDetails.getName());
            student.setCourse(studentDetails.getCourse());
            // 3. Save the updated version
            return repository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    // Method to handle DELETE
    public void deleteStudent(int id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cannot delete: Student not found with id " + id);
        }
        repository.deleteById(id);
    }
    
    @SuppressWarnings("deprecation")
	public Student getStudentById(int id) {
    	return repository.getById(id);
    }
}