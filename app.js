const fs = require("fs");
const { submission_data } = require("./submission_id_list");

let submission_id_list = [];
let submission_keyword_list = [];

submission_data.forEach((element) => {
  submission_id_list.push(element["submission_id"]);
});

fetchSubmissionKeywords();

async function fetchSubmissionKeywords() {
  const submission_keyword_list = [];

  for (const element of submission_id_list) {
    const apiUrl =
      "https://[DOMAIN]/index.php/gmj/api/v1/submissions/" +
      element +
      "?apiToken=[API_TOKEN]";

    const axios = require("axios");
    const response = await axios.get(apiUrl);
    submission_keyword_list.push({
      id: response.data.id,
      keywords: response.data.keywords,
    });
    console.log(submission_keyword_list.length);
    fs.writeFileSync(
      "export.json",
      JSON.stringify(submission_keyword_list, null, 2)
    );
  }
}