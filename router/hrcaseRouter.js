'use strict';

let hrcaseService = require(rootPath.concat("/service/hrcaseService.js"));
let hrcaseRouter = express.Router();

hrcaseRouter.get("/",hrcaseService.select);
hrcaseRouter.get("/:id",hrcaseService.get);
hrcaseRouter.post("/",hrcaseService.add);
hrcaseRouter.put("/:id",hrcaseService.update);
hrcaseRouter.delete("/:id",hrcaseService.delete);

module.exports = hrcaseRouter;