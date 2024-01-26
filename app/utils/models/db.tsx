import mysql from "serverless-mysql";

const connection = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
});

export { connection };

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