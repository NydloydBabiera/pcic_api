module.exports = function productActions({ pool }) {
  return Object.freeze({ addNewProduct, getAllProducts });

  async function addNewProduct(prodDetails) {
    const {
      prod_name,
      variant,
      description,
      cap_amt,
      retail_amt,
      whole_amt,
      unit_measure,
    } = prodDetails;

    let sql = `INSERT INTO public.product_tbl(
       prod_name, variant, description, capital_amount, retail_amount, wholesale_amount, unit_measurement)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    let param = [
      prod_name,
      variant,
      description,
      cap_amt,
      retail_amt,
      whole_amt,
      unit_measure,
    ];

    try {
      let result = await pool.query(sql, param);

      return result.rows;
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  async function getAllProducts() {
    let sql = `select * from product_tbl`;

    try {
      let result = await pool.query(sql);
      return result.rows;
    } catch (error) {
      console.log("ERROR:", error);
    }
  }
};
