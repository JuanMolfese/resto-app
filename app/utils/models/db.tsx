import mysql from "mysql2/promise";

async function initdb (){
  const connection = await mysql.createConnection({    
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      port: parseInt(process.env.MYSQLPORT!),
      database: process.env.MYSQLDATABASE,    
    });
  return connection;  
}
const connection = await initdb();

export { connection };

/* Info de DOC serverlss-mysql: 
	
// Main handler function
exports.handler = async (event, context) => {
  // Run your execute
  let results = await mysql.execute('SELECT * FROM table')
 
  // Run clean up function (Note that end() will NOT necessarily terminate the connection. Only if it has to to manage the connections. If you'd like to explicitly terminate connections, use the quit() method.)
  await mysql.end()
 	
   // Gracefully terminate the connection
   mysql.quit()

  // Return the results
  return results
} */