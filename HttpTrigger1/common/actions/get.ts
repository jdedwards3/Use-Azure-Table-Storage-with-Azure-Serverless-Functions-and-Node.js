import { tableHelpers } from "../tableHelpers";

const getAction = async function (context, req) {
  try {
    const entity = await tableHelpers.retrieveEntity(
      "TestTable",
      "TestPartition",
      context.bindingData.rowKey
    );

    const formattedEntity = formatEntity(entity);

    context.res!.status = 200;
    context.res!.body = formattedEntity;
  } catch (error) {
    console.log(error);
    context.res!.status = 400;
    context.res!.body = {
      message: "An error occurred",
    };
  }
};

const formatEntity = function (entity) {
  const formattedEntity = {};
  Object.keys(entity).map(function (key) {
    if (!key.startsWith(".")) {
      formattedEntity[key] = entity[key]["_"];
    }
  });
  return formattedEntity;
};

export { getAction };
