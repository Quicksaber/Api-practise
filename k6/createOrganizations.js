import http from "k6/http";
import { check, sleep } from "k6";

const url = "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3lwcmVzcy1hcGkudml2aWZ5c2NydW0tc3RhZ2UuY29tL2FwaS92Mi9sb2dpbiIsImlhdCI6MTY3NTk0MzQ0MywibmJmIjoxNjc1OTQzNDQzLCJqdGkiOiJZMk0xck5WM0wwYUVocW0zIiwic3ViIjoyOTY5LCJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6Mjk2OSwidG9rZW5fdXVpZCI6IkRmcHJPS2ZJNHZ5TmZDU3kifX0.Tfj-pmkO2yrNaRj9W4igBnTW5XBlK4AAma-tc06nG0E";
const params = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
const payload = {
  name: randomStringGenerator(5),
};

export const options = {
  stages: [{ duration: "10s", target: 20 }],
};

export default function () {
  const res = http.post(url, payload, params);
  check(res, { "status was 201": (r) => r.status == 201 });
  sleep(1);
}

function randomStringGenerator(number) {
  let name = "";
  for (let i = 0; i < number; i++) {
    const random = Math.floor(Math.random() * 27);
    name += String.fromCharCode(97 + random);
  }
  return name;
}
