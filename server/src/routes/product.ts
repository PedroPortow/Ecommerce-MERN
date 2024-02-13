import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
import { authenticateAdmin } from "../middlewares/authenticateAdmin";
import { ProductsController } from "../controllers";

const router = Router();

router.get("/", verifyToken, ProductsController.index);

router.post("/checkout", verifyToken, ProductsController.checkout);

router.put(
  "/edit/:productId",
  verifyToken,
  authenticateAdmin,
  ProductsController.update,
);

router.delete(
  "/delete/:productId",
  verifyToken,
  authenticateAdmin,
  ProductsController.deleteProduct,
);

router.get("/:productId", verifyToken, ProductsController.show);

router.post("/new", verifyToken, authenticateAdmin, ProductsController.create);

export { router as ProductRouter };
