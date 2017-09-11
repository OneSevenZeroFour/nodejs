console.log("1")

function a(callback) {
	setTimeout(function() {
		console.log("2")
		callback()
	}, 10000)
}
a(function() {
	//不阻塞这个线程
	console.log("3")
});