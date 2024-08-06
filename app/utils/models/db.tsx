import mysql from "mysql2/promise";

const connectdb = mysql.createPool({
  
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: parseInt(process.env.MYSQLPORT!),
  database: process.env.MYSQLDATABASE,
  
});

export { connectdb };

/* Info de DOC serverlss-mysql: 
	
// Main handler function
exports.handler = async (event, context) => {
  // Run your query
  let results = await mysql.query('SELECT * FROM table')
 
  // Run clean up function (Note that end() will NOT necessarily terminate the connection. Only if it has to to manage the connections. If you'd like to explicitly terminate connections, use the quit() method.)
  await mysql.end()
 	
   // Gracefully terminate the connection
   mysql.quit()

  // Return the results
  return results
} */