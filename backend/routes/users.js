const { Router } = require("express");
const controller = require("../controllers/users");
const authMiddleware = require("../middleware/auth");

const router = Router();

router.use(authMiddleware);

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
