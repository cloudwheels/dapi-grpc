const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const kebabCase = require('lodash.kebabcase');
const snakeCase = require('lodash.snakecase');

function loadPackageDefinition(serviceName) {
  const dirName = kebabCase(serviceName);
  const protoName = snakeCase(serviceName);

  const protoPath = path.join(__dirname, `../${dirName}/${protoName}.proto`);

  const definition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    bytes: Array,
    defaults: true,
  });

  const packageDefinition = grpc.loadPackageDefinition(definition);

  return packageDefinition.org.dash.platform.dapi;
}

module.exports = loadPackageDefinition;