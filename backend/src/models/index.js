
function DataModel(rawData) {
  const keys = Object.keys(rawData);
  this.postId = Number(rawData[keys[0]]);
  this.id = Number(rawData.id);
  this.name = rawData.name;
  this.email = rawData.email;
  this.body = rawData.body;
}

module.exports = DataModel;