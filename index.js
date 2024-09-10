import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    // Collect the data from the request body
    req.on("data", (chunk) => {
      body += chunk;
    });

    // When all the data is received
    req.on("end", () => {
      // Append the request body to the "data.txt" file synchronously
      fs.appendFileSync("data.txt", body + "\n");

      // Read the content of the file and print it to the console
      const fileContent = fs.readFileSync("data.txt", "utf-8");
      console.log(fileContent);

      // Send response
      res.end("Data received and appended to file.");
    });
  } else {
    // Handle other request methods
    res.end("Please send a POST request.");
  }
});

export default server;
