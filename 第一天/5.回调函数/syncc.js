console.log("1")

function a(callback) {
	console.log("2")
	callback()
}

a(function() {
	//不阻塞这个线程
	console.log("3")
});