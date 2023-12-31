const service = require('../../services/index');
const _this = {};

_this.getExample = (req, res) => {
  res.send('Hello from Express.js backend!');
};

_this.uploadFile = (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }

  res.status(200).send({
    message: "Uploaded the file successfully: " + req.file.originalname,
  });

  service.loadDataFromFile(req.file.path);
};

_this.getPaginatedList = (req, res) => {
  console.log(req.query);
  const pageSize = req.query?.pagination?.pageSize || 10;

  const filters = req.query.filters || {};

  if (filters.postId) {
    filters.postId = parseInt(filters.postId);
  }

  if (filters.id) {
    filters.id = parseInt(filters.id);
  }

  res.status(200).send(service.getPaginatedList({
    limit: pageSize,
    offset: ((req.query?.page || 1 ) - 1) * pageSize,
    ...(req.query.order && {
      sortBy: req.query?.field || 'id',
      sortDirection: req.query?.order === 'ascend' ? 'asc' : 'desc',
    }),
    filters: req.query.filters,
  }));
}

module.exports = _this;
