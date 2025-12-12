import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    new Student(1, 'Rahul ', 8, 'Male', true, 'Cricket', 'Math'),
    new Student(2, 'Priya ', 6, 'Female', false, '', 'Science')
  ];

  getStudents() {
    return this.students;
  }

  addStudent(student: Student) {
    const newId = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    student.id = newId;
    this.students.push(student);
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  updateStudent(updated: Student) {
    const index = this.students.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      this.students[index] = updated;
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
  }
}
