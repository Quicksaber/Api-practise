import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const url = "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3lwcmVzcy1hcGkudml2aWZ5c2NydW0tc3RhZ2UuY29tL2FwaS92Mi9sb2dpbiIsImlhdCI6MTY3NTk0MzQ0MywibmJmIjoxNjc1OTQzNDQzLCJqdGkiOiJZMk0xck5WM0wwYUVocW0zIiwic3ViIjoyOTY5LCJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6Mjk2OSwidG9rZW5fdXVpZCI6IkRmcHJPS2ZJNHZ5TmZDU3kifX0.Tfj-pmkO2yrNaRj9W4igBnTW5XBlK4AAma-tc06nG0E";
const params = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
export const options = {
  stages: [
    { duration: "10s", target: 20 },
    // { duration: "1m30s", target: 10 },
    // { duration: "20s", target: 0 },
  ],
};

export default function () {
  const res = http.get(url, params);
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
