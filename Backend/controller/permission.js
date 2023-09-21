const {pool}= require("../models/db")

const addpermissions = async (req, res, next) => {
    try {
        
      const {permission} = req.body;
      const query = `INSERT INTO permission (permission) VALUES ($1) RETURNING *`;
      const values = [permission];
      const response = await pool.query(query, values);
  
      if (response.rowCount) {
        res.status(201).json({
          success: true,
          message: "permission created successfully",
          response: response.rows,
        });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
  const getAllPermissions = (req, res) => {
    const query = `SELECT * FROM permission;`;
  
    pool
      .query(query)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "All the permission",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  };


  module.exports={
    addpermissions,
    getAllPermissions
  }