var fs = require("fs")
var ejs = require("ejs")

var jsonFiles = fs.readdirSync("./")
const apiTemplateFilePath = "./api-template.mdx"
let apiTemplate = fs.readFileSync(apiTemplateFilePath, "utf8")

jsonFiles.forEach((file) => {
	if (file.endsWith(".json")) {
		//read json file with data
		let apiData = JSON.parse(fs.readFileSync(file, "utf8"))

		// re-write file variables
		if (apiData) {
			contents = render(apiTemplate, apiData)
			fs.writeFileSync(
				"../pages/API/" + file.split(".")[0] + ".mdx",
				contents,
				"utf8"
			)
		}
	}
})

function render(content, data) {
	return ejs.render(content, data)
}
