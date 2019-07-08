module.exports = class Data {
  constructor() {
    this.coursesJson = [
      { id: "1", name: "Biology", teacher: "Mr. D" },
      { id: "2", name: "History", teacher: "Mrs. P" },
      { id: "3", name: "Math", teacher: "Mrs. C" }
    ];

    this.marksJson = [
      { test_id: "1", student_id: "1", mark: "78" },
      { test_id: "2", student_id: "1", mark: "87" },
      { test_id: "3", student_id: "1", mark: "95" },
      { test_id: "4", student_id: "1", mark: "32" },
      { test_id: "5", student_id: "1", mark: "65" },
      { test_id: "6", student_id: "1", mark: "78" },
      { test_id: "7", student_id: "1", mark: "40" },
      { test_id: "1", student_id: "2", mark: "78" },
      { test_id: "2", student_id: "2", mark: "87" },
      { test_id: "3", student_id: "2", mark: "15" },
      { test_id: "6", student_id: "2", mark: "78" },
      { test_id: "7", student_id: "2", mark: "40" },
      { test_id: "1", student_id: "3", mark: "78" },
      { test_id: "2", student_id: "3", mark: "87" },
      { test_id: "3", student_id: "3", mark: "95" },
      { test_id: "4", student_id: "3", mark: "32" },
      { test_id: "5", student_id: "3", mark: "65" },
      { test_id: "6", student_id: "3", mark: "78" },
      { test_id: "7", student_id: "3", mark: "40" }
    ];

    this.studentsJson = [
      { id: "1", name: "A" },
      { id: "2", name: "B" },
      { id: "3", name: "C" }
    ];

    this.testsJson = [
      { id: "1", course_id: "1", weight: "10" },
      { id: "2", course_id: "1", weight: "40" },
      { id: "3", course_id: "1", weight: "50" },
      { id: "4", course_id: "2", weight: "40" },
      { id: "5", course_id: "2", weight: "60" },
      { id: "6", course_id: "3", weight: "90" },
      { id: "7", course_id: "3", weight: "10" }
    ];

    this.coursesHash = {
      1: { name: "Biology", teacher: "Mr. D" },
      2: { name: "History", teacher: "Mrs. P" },
      3: { name: "Math", teacher: "Mrs. C" }
    };

    this.studentsHash = {
      1: { name: "A" },
      2: { name: "B" },
      3: { name: "C" }
    };

    this.testsHash = {
      1: { course_id: "1", weight: "10" },
      2: { course_id: "1", weight: "40" },
      3: { course_id: "1", weight: "50" },
      4: { course_id: "2", weight: "40" },
      5: { course_id: "2", weight: "60" },
      6: { course_id: "3", weight: "90" },
      7: { course_id: "3", weight: "10" }
    };

    this.tests = {
      1: { course_id: 1, weight: 10 },
      2: { course_id: 1, weight: 90 }
    };

    this.courses = {
      1: { name: "Biology", teacher: "Mr. D" }
    };

    this.marks = [
      { test_id: 1, student_id: 1, mark: 78 },
      { test_id: 2, student_id: 1, mark: 87 }
    ];

    this.students = { 1: { name: "Bob" } };

    this.course1 = {
      name: "Biology",
      teacher: "Mr. D",
      total: 86.1
    };

    this.course2 = {
      2: {
        name: "History",
        teacher: "Mrs. P",
        total: 47.5
      }
    };

    this.unformattedReportCardWith1Course = {
      1: {
        name: "Bob",
        courses: {
          1: {
            name: "Biology",
            teacher: "Mr. D",
            total: 86.1
          }
        },
        totalScore: 0,
        totalCourses: 0
      }
    };

    this.unformattedReportCardWith2Courses = {
      1: {
        name: "Bob",
        courses: {
          1: {
            name: "Biology",
            teacher: "Mr. D",
            total: 86.1
          },
          2: {
            name: "History",
            teacher: "Mrs. P",
            total: 47.5
          }
        },
        totalScore: 0,
        totalCourses: 0
      }
    };

    this.lineOne = "Student Id: 1, name: Bob";

    this.lineCourse1 =
      "\tCourse: Biology, Teacher: Mr. D\n\tFinal Grade:\t86.10%\n";

    this.lineCourse2 =
      "\tCourse: History, Teacher: Mrs. P\n\tFinal Grade:\t47.50%\n";

    this.lineTwo = "Total Average:\t\t66.80%\n";

    this.formattedReportCard1 = [
      this.lineOne,
      this.lineTwo,
      this.lineCourse1,
      this.lineCourse2
    ].join("\n");
  }
};
