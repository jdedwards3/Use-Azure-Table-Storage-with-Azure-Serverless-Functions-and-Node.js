import { tableHelpers } from "../tableHelpers";

const getAction = async function (context, req) {
  try {
    const entity = await tableHelpers.retrieveEntity(
      "TestTable",
      "TestPartition",
      context.bindingData.rowKey
    );
    context.res!.status = 200;
    context.res!.body = {
      message: "Data retrieved.",
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

export { getAction };
