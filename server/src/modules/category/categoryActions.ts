import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

// Example categories array
const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();
  res.json(categoriesFromDB);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const category = categories.find((c) => c.id === parsedId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = req.body;
    const result = await categoryRepository.create(newCategory);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const updatedCategory = req.body;
    const affectedRows = await categoryRepository.update(
      categoryId,
      updatedCategory,
    );
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const affectedRows = await categoryRepository.delete(categoryId);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { name } = req.body;

  // put your validation rules here
  if (!name || typeof name !== "string") {
    errors.push({
      field: "name",
      message: "Name is required and must be a string",
    });
  }

  if (errors.length === 0) {
    try {
      const categoryId = Number(req.params.id);
      const affectedRows = await categoryRepository.validate(categoryId);
      if (affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

// Export them to import them somewhere else
export default { browse, read, add, edit, destroy, validate };
