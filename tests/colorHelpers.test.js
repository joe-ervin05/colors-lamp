const fs = require("fs");
const path = require("path");
const vm = require("vm");

function loadClientScript()
{
	const scriptPath = path.join(__dirname, "..", "public", "js", "code.js");
	const script = fs.readFileSync(scriptPath, "utf8");
	const context = {
		document: {
			cookie: "",
			getElementById: jest.fn(),
			getElementsByTagName: jest.fn()
		},
		window: {
			location: {
				href: ""
			}
		},
		XMLHttpRequest: jest.fn()
	};

	vm.createContext(context);
	vm.runInContext(script, context, {filename: "code.js"});

	return context;
}

describe("color form helpers", () => {
	test("formats color names before sending them to the API", () => {
		const {formatColorName} = loadClientScript();

		expect(formatColorName("  light   blue  ")).toBe("light blue");
	});

	test("builds the add-color request payload", () => {
		const {buildAddColorPayload} = loadClientScript();

		expect(buildAddColorPayload("  forest   green ", 7)).toEqual({
			color: "forest green",
			userId: 7
		});
	});
});
