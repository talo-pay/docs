var fs = require("fs")
var ejs = require("ejs")

var jsonFiles = fs.readdirSync("./")

jsonFiles.forEach((file) => {
	if (file.endsWith(".json")) {
		//delete file
		fs.unlinkSync("../content/API/" + file.split(".")[0] + ".mdx")
	}
})
