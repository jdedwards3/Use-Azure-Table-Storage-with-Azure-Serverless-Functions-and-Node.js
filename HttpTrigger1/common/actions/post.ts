import * as querystring from "querystring";
import * as azureStorage from "azure-storage";
import { v4 as uuidv4 } from "uuid";
import { tableHelpers } from "../tableHelpers";

const postAction = async function (context, req) {
  //parses www-form-urlencoded request body
  const body = querystring.parse(req.body) as {
    firstName: string;
    lastName: string;
    age: string;
  };

  if (!(body && body.firstName && body.lastName && !isNaN(Number(body.age)))) {
    context.res!.status = 400;
    context.res!.body = {
      message: "The data is invalid.",
    };
    return;
  }

  // inform table storage of row types
  const entityGenerator = azureStorage.TableUtilities.entityGenerator;

  // storing data within the same storage partition
  // partition key and row key combo must be unique but also type string
  const entityData = {
    PartitionKey: entityGenerator.String("TestPartition"),
    RowKey: entityGenerator.String(uuidv4()),
    firstName: entityGenerator.String(body.firstName),
    lastName: entityGenerator.String(body.lastName),
    age: entityGenerator.Int32(Number(body.age)),
  };

  try {
    const tableName = "TestTable";

    await tableHelpers.createTableIfNotExists(tableName);

    await tableHelpers.insertEntity(tableName, entityData);

    context.res!.status = 200;
    context.res!.body = {
      message: "Data is saved.",
      data: entityData,
    };
  } catch (error) {
    console.log(error);
    context.res!.status = 400;
    context.res!.body = {
      message: "An error occurred.",
    };
  }
};

export { postAction };
