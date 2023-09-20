const { pool } = require("../models/db");

const authorization = (requiredPermission) => {
  return async (req, res, next) => {
    let client; 

    try {
      const userId = req.token.userId;

      client = await pool.connect(); 

      const query = 'SELECT role_id FROM users WHERE id = $1';
      const userRole = await client.query(query, [userId]);
      const userRoleId = userRole.rows[0].role_id;

      const permissionQuery = `
        SELECT rp.id
        FROM role_permission rp
        JOIN permissions p ON rp.permission_id = p.id
        WHERE rp.role_id = $1 AND p.permission = $2
      `;
      const permissionResult = await client.query(permissionQuery, [userRoleId, requiredPermission]);

      if (permissionResult.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    } finally {
      if (client) {
        client.release(); 
      }
    }
  };
};

module.exports = authorization;
