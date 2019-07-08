const { expect } = require("chai");
const ReadCsvFiles = require("../src/ReadCsvFiles.js");
const Student = require("../src/Student.js");
const Course = require("../src/Course.js");
const GenerateReportCards = require("../src/GenerateReportCards.js");
const Data = new (require("./Data/Data.js"))();

const testCsvDirectory = __dirname + "/testcsvfiles";

describe("ReadCsvFiles class", () => {
  let readCsvFiles;

  beforeEach(() => {
    readCsvFiles = new ReadCsvFiles(testCsvDirectory);
  });

  it("Should exist", () => {
    expect(readCsvFiles).to.exist;
  });

  it("Should intialize properties", () => {
    expect(readCsvFiles.csvDirectory).to.equal(testCsvDirectory);
    expect(readCsvFiles.courses).to.be.empty;
    expect(readCsvFiles.marks).to.be.empty;
    expect(readCsvFiles.students).to.be.empty;
    expect(readCsvFiles.tests).to.be.empty;
  });

  it("Should have methods", () => {
    expect(readCsvFiles.createPath).to.be.a("function");
    expect(readCsvFiles.readCsv).to.be.a("function");
    expect(readCsvFiles.convertCsvToJson).to.be.a("function");
    expect(readCsvFiles.readTargetIntoJson).to.be.a("function");
    expect(readCsvFiles.convertJsonToHash).to.be.a("function");
    expect(readCsvFiles.convertCsvToHash).to.be.a("function");
    expect(readCsvFiles.updateProperties).to.be.a("function");
  });
});

describe("GenerateReportCards class", () => {
  let generateReportCards;

  beforeEach(() => {
    generateReportCards = new GenerateReportCards();
  });

  it("Should exist", () => {
    expect(generateReportCards).to.exist;
  });

  it("Should intialize properties", () => {
    expect(generateReportCards.reportCards).to.be.empty;
  });

  it("Should have methods", () => {
    expect(generateReportCards.doesStudentExist).to.be.a("function");
    expect(generateReportCards.createNewStudent).to.be.a("function");
    expect(generateReportCards.doesCourseExist).to.be.a("function");
    expect(generateReportCards.createNewCourse).to.be.a("function");
    expect(generateReportCards.addMark).to.be.a("function");
    expect(generateReportCards.createReportCards).to.be.a("function");
    expect(generateReportCards.formatLineOne).to.be.a("function");
    expect(generateReportCards.formatCourseAndAddToTotal).to.be.a("function");
    expect(generateReportCards.formatAllCourses).to.be.a("function");
    expect(generateReportCards.formatLineTwo).to.be.a("function");
    expect(generateReportCards.formatReportCard).to.be.a("function");
    expect(generateReportCards.formatAllReportCards).to.be.a("function");
  });
});

describe("Student class", () => {
  let student;

  beforeEach(() => {
    student = new Student("Bob");
  });

  it("Should exist", () => {
    expect(student).to.exist;
  });

  it("Should initialize properties", () => {
    expect(student.name).to.equal("Bob");
    expect(student.courses).to.be.empty;
    expect(student.totalScore).to.equal(0);
    expect(student.totalCourses).to.equal(0);
  });
});

describe("Course class", () => {
  let course;

  beforeEach(() => {
    course = new Course("Biology", "Mr. D");
  });

  it("Should exist", () => {
    expect(course).to.exist;
  });

  it("Should initialize properties", () => {
    expect(course.name).to.equal("Biology");
    expect(course.teacher).to.equal("Mr. D");
    expect(course.total).to.equal(0);
  });
});

describe("ReadCsvFiles functionality", () => {
  let readCsvFiles, coursesPath, marksPath, studentsPath, testsPath;

  beforeEach(() => {
    coursesPath = "/courses.csv";
    marksPath = "/marks.csv";
    studentsPath = "/students.csv";
    testsPath = "/tests.csv";
    readCsvFiles = new ReadCsvFiles(testCsvDirectory);
  });

  it("Should return the absolute path", () => {
    const fullPath = readCsvFiles.createPath(coursesPath);

    expect(fullPath).to.equal(testCsvDirectory + coursesPath);
  });

  it("Should read csv files into a string", () => {
    const string =
      "id,name,teacher\n1,Biology,Mr. D\n2,History, Mrs. P\n3,Math, Mrs. C\n";

    expect(readCsvFiles.readCsv(coursesPath));
  });

  it("Should convert a csv into json", () => {
    const csv = readCsvFiles.readCsv(coursesPath);

    expect(readCsvFiles.convertCsvToJson(csv)).to.deep.equal(Data.coursesJson);
  });

  it("Should convert courses, marks, students, and tests into json", () => {
    expect(readCsvFiles.readTargetIntoJson(marksPath)).to.deep.equal(
      Data.marksJson
    );
    expect(readCsvFiles.readTargetIntoJson(studentsPath)).to.deep.equal(
      Data.studentsJson
    );
    expect(readCsvFiles.readTargetIntoJson(testsPath)).to.deep.equal(
      Data.testsJson
    );
  });

  it("Should convert json to object with json id as key and value as object of keys of json", () => {
    const coursesJson = readCsvFiles.readTargetIntoJson(coursesPath);
    const studentsJson = readCsvFiles.readTargetIntoJson(studentsPath);
    const testsJson = readCsvFiles.readTargetIntoJson(testsPath);

    expect(readCsvFiles.convertJsonToHash(coursesJson)).to.deep.equal(
      Data.coursesHash
    );
    expect(readCsvFiles.convertJsonToHash(studentsJson)).to.deep.equal(
      Data.studentsHash
    );
    expect(readCsvFiles.convertJsonToHash(testsJson)).to.deep.equal(
      Data.testsHash
    );
  });

  it("Should update courses, marks, students, and tests properties with json or hash of csv files", () => {
    readCsvFiles.updateProperties();

    expect(readCsvFiles.courses).to.deep.equal(Data.coursesHash);
    expect(readCsvFiles.marks).to.deep.equal(Data.marksJson);
    expect(readCsvFiles.students).to.deep.equal(Data.studentsHash);
    expect(readCsvFiles.tests).to.deep.equal(Data.testsHash);
  });
});

describe("GenerateReportCards functionality", () => {
  let generateReportCards;

  beforeEach(() => {
    generateReportCards = new GenerateReportCards();
  });

  it("Should return true if student exists", () => {
    generateReportCards.reportCards[1] = new Student("Bob");

    expect(generateReportCards.doesStudentExist(1)).to.be.true;
  });

  it("Should return false if student does exist", () => {
    expect(generateReportCards.doesStudentExist(23)).to.be.false;
  });

  it("Should create a new student", () => {
    generateReportCards.createNewStudent(1, "Bob");

    expect(generateReportCards.reportCards[1]).to.exist;
  });

  it("Should create a new course for a student", () => {
    generateReportCards.createNewStudent(1, "Bob");
    generateReportCards.createNewCourse(1, 1, "Biology", "Mr. D");

    const {
      name,
      teacher,
      total
    } = generateReportCards.reportCards[1].courses[1];

    expect(teacher).to.equal("Mr. D");
    expect(name).to.equal("Biology");
    expect(total).to.equal(0);
  });

  it("Should return true if course exists for a student", () => {
    generateReportCards.createNewStudent(1, "Bob");
    generateReportCards.createNewCourse(1, 1, "Biology", "Mr. D");

    expect(generateReportCards.doesCourseExist(1, 1)).to.be.true;
  });

  it("Should return false if course does not exist for a student", () => {
    generateReportCards.createNewStudent(1, "Bob");

    expect(generateReportCards.doesCourseExist(1, 23)).to.be.false;
  });

  it("Should add score of test to total of a course", () => {
    const solution1 = 7.8;
    const solution2 = 86.1;

    generateReportCards.createNewStudent(1, "Bob");
    generateReportCards.createNewCourse(1, 1, "Biology", "Mr. D");
    generateReportCards.addMark(1, 1, Data.tests, Data.courses, 78);

    expect(generateReportCards.reportCards[1].courses[1].total).to.equal(
      solution1
    );

    generateReportCards.addMark(1, 2, Data.tests, Data.courses, 87);

    expect(generateReportCards.reportCards[1].courses[1].total).to.equal(
      solution2
    );
  });

  it("Should create a list of students and their grades for each course", () => {
    generateReportCards.createReportCards(
      Data.courses,
      Data.marks,
      Data.students,
      Data.tests
    );

    expect(generateReportCards.reportCards).to.deep.equal(
      Data.unformattedReportCardWith1Course
    );
  });

  it("Should format the first line correctly", () => {
    generateReportCards.reportCards = Data.unformattedReportCardWith1Course;

    expect(generateReportCards.formatLineOne(1)).to.equal(Data.lineOne);
  });

  it("Should format a course correctly and add to student's total score", () => {
    generateReportCards.reportCards = Data.unformattedReportCardWith1Course;

    expect(
      generateReportCards.formatCourseAndAddToTotal(Data.course1, 1)
    ).to.equal(Data.lineCourse1);

    expect(generateReportCards.reportCards[1].totalScore).to.equal(86.1);
    expect(generateReportCards.reportCards[1].totalCourses).to.equal(1);
  });

  it("Should format multiple courses", () => {
    generateReportCards.reportCards = Data.unformattedReportCardWith2Courses;
    const multipleCourses = Data.lineCourse1 + "\n" + Data.lineCourse2;

    expect(generateReportCards.formatAllCourses(1)).to.equal(multipleCourses);
  });

  it("Should calculate average of scores of all courses", () => {
    generateReportCards.reportCards = Data.unformattedReportCardWith2Courses;
    generateReportCards.formatAllCourses(1);

    expect(generateReportCards.formatLineTwo(1)).to.equal(Data.lineTwo);
  });

  it("Should format report card in correct format", () => {
    generateReportCards.reportCards = Data.unformattedReportCardWith2Courses;

    const result = generateReportCards.formatReportCard(1);

    expect(result).to.be.a("string");
    expect(result).to.equal(Data.formattedReportCard1);
  });
});
