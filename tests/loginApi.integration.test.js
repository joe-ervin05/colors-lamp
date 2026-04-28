const {spawn} = require("child_process");

const baseUrl = "http://127.0.0.1:8099";
let server;

async function waitForServer()
{
	for(let attempt = 0; attempt < 20; attempt++)
	{
		try
		{
			const response = await fetch(`${baseUrl}/public/index.html`);
			if( response.ok )
			{
				return;
			}
		}
		catch(err)
		{
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	}

	throw new Error("PHP test server did not start");
}

beforeAll(async() => {
	server = spawn("php", ["-S", "127.0.0.1:8099", "-t", "."], {
		cwd: process.cwd(),
		stdio: "ignore"
	});

	await waitForServer();
});

afterAll(() => {
	if( server )
	{
		server.kill();
	}
});

describe("Login API integration", () => {
	test("responds with JSON using the expected shape", async() => {
		const response = await fetch(`${baseUrl}/api/Login.php`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				login: "__test_user__",
				password: "__test_password__"
			})
		});
		const payload = await response.json();

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toContain("application/json");
		expect(payload).toEqual({
			id: expect.any(Number),
			firstName: expect.any(String),
			lastName: expect.any(String),
			error: expect.any(String)
		});
	});
});
