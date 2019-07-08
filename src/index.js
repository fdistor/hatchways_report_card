const ReadCsvFiles = require("./ReadCsvFiles.js");
const GenerateReportCards = require("./GenerateReportCards.js");

const createReportCardsTextFile = csvPath => {
  const convertedCsv = new ReadCsvFiles(__dirname + csvPath);

  convertedCsv.updateProperties();

  const { courses, marks, students, tests } = convertedCsv;
  const reportCards = new GenerateReportCards();

  reportCards.createReportCards(courses, marks, students, tests);
  reportCards.writeReportCards();
};

createReportCardsTextFile("/../csvfiles");
