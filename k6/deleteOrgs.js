import http from "k6/http";
import { check, sleep } from "k6";

const delOrgUrl =
  "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations";
const getOrgUrl =
  "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations";
const password = "sifra123";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3lwcmVzcy1hcGkudml2aWZ5c2NydW0tc3RhZ2UuY29tL2FwaS92Mi9sb2dpbiIsImlhdCI6MTY3NTk0MzQ0MywibmJmIjoxNjc1OTQzNDQzLCJqdGkiOiJZMk0xck5WM0wwYUVocW0zIiwic3ViIjoyOTY5LCJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6Mjk2OSwidG9rZW5fdXVpZCI6IkRmcHJPS2ZJNHZ5TmZDU3kifX0.Tfj-pmkO2yrNaRj9W4igBnTW5XBlK4AAma-tc06nG0E";
const params = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
const payload = {
  passwordOrEmail: password,
};
let orgIds = [];

export const options = {
  stages: [{ duration: "1s", target: 1 }],
};

export default function () {
  const resGet = http.get(getOrgUrl, params);
  let url = delOrgUrl + "/" + resGet.json()[0]["id"];
  if (typeof resGet !== "undefined") {
    console.log(resGet.json()[0]["id"]);
  }

  check(resGet, { "status was 200": (r) => r.status == 200 });

  const res = http.post(url, payload, params);
  check(res, { "status was 201": (r) => r.status == 201 });
  // sleep(1);
}
