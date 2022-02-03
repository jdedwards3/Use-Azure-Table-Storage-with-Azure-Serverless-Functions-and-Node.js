import * as querystring from "querystring";
import * as azureStorage from "azure-storage";
import { tableHelpers } from "../tableHelpers";

const deleteAction = async function (context, req) {
  try {
    // inform table storage of row types
    const entityGenerator = azureStorage.TableUtilities.entityGenerator;

    // use request body data to maintain row key for entity
    const entityData = {
      PartitionKey: entityGenerator.String("TestPartition"),
      RowKey: entityGenerator.String(context.bindingData.rowKey),
    };

    const statusMessage = await tableHelpers.deleteEntity(
      "TestTable",
      entityData
    );

    context.res!.status = 200;
    context.res!.body = {
      message: "Data deleted.",
      data: statusMessage,
    };
  } catch (error) {
    console.log(error);
    context.res!.status = 400;
    context.res!.body = {
      message: "An error occurred",
    };
  }
};

export { deleteAction };
