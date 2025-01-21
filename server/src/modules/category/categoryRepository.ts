import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
  }

  async create(category: Omit<Category, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [category.name],
    );

    // Return the ID of the newly inserted category
    return result.insertId;
  }

  async update(id: number, category: Omit<Category, "id">) {
    // Execute the SQL UPDATE query to modify an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update category set name = ? where id = ?",
      [category.name, id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to remove a category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from category where id = ?",
      [id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }

  async validate(id: number) {
    // Execute the SQL UPDATE query to validate a category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update category set validated = true where id = ?",
      [id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }
}

export default new CategoryRepository();
