import express from "express";
import categoryActions from "./modules/category/categoryActions";
import itemActions from "./modules/item/itemActions";
import programActions from "./modules/program/programActions";
import sayActions from "./modules/say/sayActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Define category-related routes
router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.post("/api/categories", categoryActions.add);
router.put("/api/categories/:id", categoryActions.edit);
router.delete("/api/categories/:id", categoryActions.destroy);

// Define program-related routes
router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);
router.post("/api/programs", programActions.add);
router.put("/api/programs/:id", programActions.edit);
router.delete("/api/programs/:id", programActions.destroy);

/* ************************************************************************* */

// Declaration of a "Welcome" route
router.get("/", sayActions.sayWelcome);

/* ************************************************************************* */

export default router;
