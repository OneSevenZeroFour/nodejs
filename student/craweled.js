for(let i = 0; i < imgs.length; i++) {
	var imgStream = fs.createWriteStream(`./img/vks${i}.jpg`);
	download(imgs, i, imgStream)
}