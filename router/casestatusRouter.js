'use strict';

let casestatusService = require(rootPath.concat("/service/casestatusService.js"));
let casestatusRouter = express.Router();

casestatusRouter.get("/",casestatusService.select);
casestatusRouter.get("/:id",casestatusService.get);
casestatusRouter.post("/",casestatusService.add);
casestatusRouter.put("/:id",casestatusService.update);
casestatusRouter.delete("/:id",casestatusService.delete);

module.exports = casestatusRouter;