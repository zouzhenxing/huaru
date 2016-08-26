'use strict';

let casephotoService = require(rootPath.concat("/service/casephotoService.js"));
let casephotoRouter = express.Router();

casephotoRouter.get("/",casephotoService.select);
casephotoRouter.get("/:id",casephotoService.get);
casephotoRouter.post("/",util.upfile().single("imgurl"),casephotoService.add);
casephotoRouter.put("/:id",casephotoService.update);
casephotoRouter.delete("/:id",casephotoService.delete);

module.exports = casephotoRouter;