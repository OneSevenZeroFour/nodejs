function insert(response,connection,posts) {
	console.log(posts)
	connection.query(`insert into students (name,description) values ("${posts.name}","${posts.description}")`, function(error, results, fields) {
		if(error) throw error;
		console.log('The solution is: ', results);
		response.end(JSON.stringify({
			status: 1,
			results
		}))
	});
}
module.exports = insert;