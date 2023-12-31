const fs = require("fs");
const csv = require("csv-parser");
const _ = require("lodash");

const _this = {};
const DataModel = require("../models");
let dataStorage = [];

_this.loadDataFromFile = (file) => {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (row) => {
      dataStorage.push(new DataModel(row));
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      dataStorage = _.orderBy(dataStorage, ["postId"], ["asc"]);
    });
};

const ValidFilterKeys = ["postId", "id", "name", "email", "body"];

_this.setDataStorage = (data) => {
  dataStorage = data;
};

_this.getPaginatedList = ({
  limit = 10,
  offset = 0,
  sortBy = "id",
  sortDirection = "asc",
  filters = {},
}) => {
  let result = dataStorage;

  // check if has valid filters
  for (const key in filters) {
    if (!ValidFilterKeys.includes(key)) {
      throw new Error(`Invalid filter key: ${key}`);
    }
  }
  filters = _.pickBy(filters, (value) => !!value);

  if (Object.keys(filters).length > 0) {
    result = _.filter(result, (obj) => {
      return (
        (!filters.postId || obj.postId === filters.postId) &&
        (!filters.id || obj.id === filters.id) &&
        (!filters.name || obj.name.includes(filters.name)) &&
        (!filters.email || obj.email.includes(filters.email)) &&
        (!filters.body || obj.body.includes(filters.body))
      );
    });
  }

  if (sortBy && sortDirection) {
    result = _.orderBy(result, [sortBy], [sortDirection]);
  }

  return {
    total: result.length,
    data: result.slice(offset, offset + limit),
  };
};

module.exports = _this;
