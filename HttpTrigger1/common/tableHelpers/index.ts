import * as azureStorage from "azure-storage";

const tableService = azureStorage.createTableService(
  process.env["TableStorageConnection"]
);

const createTableIfNotExists = (tableName: string) =>
  new Promise((resolve, reject) => {
    tableService.createTableIfNotExists(tableName, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const insertEntity = (tableName: string, entity: {}) =>
  new Promise((resolve, reject) => {
    tableService.insertEntity(tableName, entity, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const retrieveEntity = (
  tableName: string,
  partitionKey: string,
  rowKey: string
) =>
  new Promise((resolve, reject) => {
    tableService.retrieveEntity(
      tableName,
      partitionKey,
      rowKey,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

const updateEntity = (tableName: string, entity: {}) =>
  new Promise((resolve, reject) => {
    tableService.replaceEntity(tableName, entity, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const deleteEntity = (tableName: string, entity: {}) =>
  new Promise((resolve, reject) => {
    tableService.deleteEntity(tableName, entity, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const tableHelpers = {
  tableService,
  createTableIfNotExists,
  insertEntity,
  retrieveEntity,
  updateEntity,
  deleteEntity,
};

export { tableHelpers };
