module.exports = class Student {
  constructor(name) {
    this.name = name;
    this.courses = {};
    this.totalScore = 0;
    this.totalCourses = 0;
  }
};
