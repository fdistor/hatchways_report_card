const fs = require("fs");

module.exports = class ReadCsvFiles {
  constructor(csvDirectory) {
    this.csvDirectory = csvDirectory;
    this.courses = [];
    this.marks = [];
    this.students = [];
    this.tests = [];
  }

  createPath(target) {
    return this.csvDirectory + target;
  }

  readCsv(target) {
    const fullPath = this.createPath(target);
    return fs.readFileSync(fullPath, { encoding: "utf-8" });
  }

  convertCsvToJson(csv) {
    const rows = csv.split(/\n/);
    let len = rows.length;

    /* 
    For some csv files, there's a trailing \n after reading which causes the length to 
    be 1 row more than it should be
    */
    while (rows[len - 1] === "") {
      len -= 1;
    }

    const headers = rows[0].split(",");
    const results = [];

    for (let i = 1; i < len; i++) {
      const obj = {};
      const row = rows[i].split(",");

      headers.forEach((header, index) => {
        obj[header] = row[index].trim();
      });

      results.push(obj);
    }

    return results;
  }

  readTargetIntoJson(target) {
    const csv = this.readCsv(target);

    return this.convertCsvToJson(csv);
  }

  convertJsonToHash(json) {
    const obj = {};
    json.forEach(row => {
      obj[row.id] = {};
      for (let key in row) {
        if (key !== "id") {
          obj[row.id][key] = row[key];
        }
      }
    });

    return obj;
  }

  convertCsvToHash(target) {
    const csv = this.readCsv(target);
    const json = this.convertCsvToJson(csv);
    return this.convertJsonToHash(json);
  }

  updateProperties() {
    this.courses = this.convertCsvToHash("/courses.csv");
    this.marks = this.readTargetIntoJson("/marks.csv");
    this.students = this.convertCsvToHash("/students.csv");
    this.tests = this.convertCsvToHash("/tests.csv");
  }
};
