import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { actions } from "./common/actions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  // set content type for all responses
  context.res!.headers["Content-Type"] = "application/json";

  if (req.method == "POST") {
    await actions.postAction(context, req);
  } else if (req.method == "GET") {
    await actions.getAction(context, req);
  } else if (req.method == "PUT") {
    await actions.putAction(context, req);
  } else if (req.method == "DELETE") {
    await actions.deleteAction(context, req);
  } else {
    // method does not match any
    context.res!.status = 500;
  }
};

export default httpTrigger;
