import * as querystring from "querystring";
import * as azureStorage from "azure-storage";
import { tableHelpers } from "../tableHelpers";

const putAction = async function (context, req) {
  //parses www-form-urlencoded request body
  const body = querystring.parse(req.body) as {
    rowKey: string;
    firstName: string;
    lastName: string;
    age: string;
  };

  // inform table storage of row types
  const entityGenerator = azureStorage.TableUtilities.entityGenerator;

  // use request body data to maintain row key for entity
  const entityData = {
    PartitionKey: entityGenerator.String("TestPartition"),
    RowKey: entityGenerator.String(body.rowKey),
    firstName: entityGenerator.String(body.firstName),
    lastName: entityGenerator.String(body.lastName),
    age: entityGenerator.Int32(Number(body.age)),
  };

  try {
    const entity = await tableHelpers.updateEntity("TestTable", entityData);
    context.res!.status = 200;
    context.res!.body = {
      message: "Data is updated.",
      data: entity,
    };
  } catch (error) {
    console.log(error);
    context.res!.status = 400;
    context.res!.body = {
      message: "An error occurred",
    };
  }
};

export { putAction };
