const Student = require("./Student.js");
const Course = require("./Course.js");
const fs = require("fs");

module.exports = class GenerateReportCards {
  constructor() {
    this.reportCards = {};
  }

  doesStudentExist(studentId) {
    return typeof this.reportCards[studentId] === "object";
  }

  doesCourseExist(studentId, courseId) {
    return typeof this.reportCards[studentId].courses[courseId] === "object";
  }

  createNewStudent(studentId, studentName) {
    const student = new Student(studentName);
    this.reportCards[studentId] = student;
  }

  createNewCourse(studentId, courseId, courseName, teacher) {
    const course = new Course(courseName, teacher);
    this.reportCards[studentId].courses[courseId] = course;
  }

  addMark(studentId, testId, tests, courses, mark) {
    const courseId = tests[testId].course_id;

    if (!this.doesCourseExist(studentId, courseId, studentId)) {
      const { name, teacher } = courses[courseId];
      this.createNewCourse(studentId, courseId, name, teacher);
    }

    const totalTestScore = this.reportCards[studentId].courses[courseId].total;
    const weight = Number(tests[testId].weight);
    const weightedScore = (mark * weight) / 100;

    this.reportCards[studentId].courses[courseId].total =
      totalTestScore + weightedScore;
  }

  createReportCards(courses, marks, students, tests) {
    marks.forEach(row => {
      const { test_id, student_id, mark } = row;

      if (!this.doesStudentExist(student_id)) {
        const studentName = students[student_id].name;
        this.createNewStudent(student_id, studentName);
      }

      this.addMark(student_id, test_id, tests, courses, mark);
    });
  }

  formatLineOne(studentId) {
    const { name } = this.reportCards[studentId];
    return `Student Id: ${studentId}, name: ${name}`;
  }

  formatCourseAndAddToTotal(course, studentId) {
    const { name, teacher, total } = course;
    this.reportCards[studentId].totalScore += total;
    this.reportCards[studentId].totalCourses += 1;

    return `\tCourse: ${name}, Teacher: ${teacher}\n\tFinal Grade:\t${total.toFixed(
      2
    )}%\n`;
  }

  formatAllCourses(studentId) {
    const courses = this.reportCards[studentId].courses;
    const results = [];

    for (let course in courses) {
      results.push(this.formatCourseAndAddToTotal(courses[course], studentId));
    }

    return results.join("\n");
  }

  formatLineTwo(studentId) {
    const { totalScore, totalCourses } = this.reportCards[studentId];
    const totalAverage = (
      Math.round((totalScore / totalCourses) * 100) / 100
    ).toFixed(2);

    return `Total Average:\t\t${totalAverage}%\n`;
  }

  formatReportCard(studentId) {
    const lineOne = this.formatLineOne(studentId);
    const lineCourses = this.formatAllCourses(studentId);
    const lineTwo = this.formatLineTwo(studentId);

    return [lineOne, lineTwo, lineCourses].join("\n");
  }

  formatAllReportCards() {
    const results = [];

    for (let studentId in this.reportCards) {
      results.push(this.formatReportCard(studentId));
    }

    return results.join("\n");
  }

  writeReportCards() {
    const cards = this.formatAllReportCards();

    fs.writeFileSync(__dirname + "/../reportcards/reportcards.text", cards, {
      encoding: "utf-8"
    });
  }
};
