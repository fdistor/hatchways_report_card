# Report Card Maker

This is a node application that will create a text file of the perfomance of students given csv files of courses, marks, students and tests.

## Installing

1. In a terminal while in the root of this project, run `npm install`

## Prerequisites

- Node
- 4 CSV files located in the folder `csvfiles` of this project (samples included)
  1. `courses.csv` has columns **id**, **name**, and **teacher**
  1. `marks.csv` has columns **test_id**, **student_id**, and **mark**
  1. `students.csv` has columns **id** and **name**
  1. `tests.csv` has columns **id**, **course_id**, and **weight** <br />
     _Note: this is assuming that all courses, marks, students, and tests are completely filled out (i.e. all weights add to 100, all tests have been taken)_

## Running the Program

1. Open a terminal and navigate to the root of the project
1. To see the tests, run `npm test`
1. To generate report cards, run `npm start`
1. Text file containing report cards will be in `reportcards/reportcards.txt`

## Built With

- [File System](https://nodejs.org/api/fs.html)

## Authors

- **Francis Distor** - _Initial work_ - [Github](https://github.com/fdistor)
