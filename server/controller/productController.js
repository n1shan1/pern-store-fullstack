import { sql } from "../config/db.js";

const getProducts = async (req, res) => {
  // Fetch products from database
  try {
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    `;
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "ISE: Products not fetched" });
  }
};

const getProductById = async (req, res) => {
  // Fetch product by id from database
  const { id } = req.params;
  try {
    const response = await sql`
    SELECT * FROM products
    WHERE id = ${id}

    `;
    if (response.count === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    return res.status(200).json({ success: true, data: response[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "ISE: Product not fetched" });
  }
};

const createProduct = async (req, res) => {
  // Create product in database
  const { name, price, image, description } = req.body;
  if (!name || !price || !image || !description) {
    return res.status(500).json({
      success: false,
      error: "Please provide name, price and image, description",
    });
  }
  try {
    const response = await sql`
    INSERT INTO products (name, price, image, description)
    VALUES (${name}, ${price}, ${image}, ${description})
    RETURNING *
    `;
    console.log("Product added:", response);
    return res.status(200).json({ success: true, data: response[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "ISE: Product not created" });
  }
};

const updateProduct = async (req, res) => {
  // Update product in database
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const response = await sql`
    UPDATE products
    SET name = ${name}, price = ${price}, image = ${image}
    WHERE id = ${id}
    RETURNING *
    `;
    if (response.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    return res.status(200).json({ success: true, data: response[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "ISE: Product not updated" });
  }
};

const deleteProduct = async (req, res) => {
  // Delete product from database
  try {
    const { id } = req.params;
    const response = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *
    `;
    if (response.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "ISE: Product not deleted" });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
