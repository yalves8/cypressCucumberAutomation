import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";

const base = "https://demoqa.com";
let userName;
const password = "Qa@12345!a";
let userId;
let token;
let selectedBooks = [];

Before(() => {
  userName = `yasmin.accenture_${Date.now()}`;
  userId = null;
  token = null;
  selectedBooks = [];
});

Given("that valid data exists to create a user", () => {
    //userName = `qa_user_${Date.now()}`;
});

When("the user is created via API", () => {
  cy.request("POST", `${base}/Account/v1/User`, {
    userName,
    password,
  }).then((res) => {
    expect([200, 201]).to.include(res.status);
    userId = res.body.userID;
  });
});

When("an access token is generated", () => {
  cy.request("POST", `${base}/Account/v1/GenerateToken`, {
    userName,
    password,
  }).then((res) => {
    expect(res.status).to.eq(200);
    token = res.body.token;
  });
});

When("it is verified whether the user is authorized", () => {
  cy.request("POST", `${base}/Account/v1/Authorized`, {
    userName,
    password,
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.eq(true);
  });
});

When("the list of available books is consulted", () => {
  cy.request("GET", `${base}/BookStore/v1/Books`).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.books.length).to.be.greaterThan(1);
    selectedBooks = res.body.books.slice(0, 2).map((b) => ({ isbn: b.isbn }));
  });
});

When("both books are reserved for the user", () => {
  cy.request({
    method: "POST",
    url: `${base}/BookStore/v1/Books`,
    headers: { Authorization: `Bearer ${token}` },
    body: {
      userId,
      collectionOfIsbns: selectedBooks,
    },
  }).then((res) => {
    expect([200, 201]).to.include(res.status);
  });
});

Then("it is then validated that the user has both reserved books", () => {
  cy.request({
    method: "GET",
    url: `${base}/Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.status).to.eq(200);
    const returnedIsbns = res.body.books.map((b) => b.isbn).sort();
    const isbnsExpected = selectedBooks.map((b) => b.isbn).sort();
    expect(returnedIsbns).to.deep.eq(isbnsExpected);
  });
});

After(() => {
  if (userId && token) {
    cy.request({
      method: "DELETE",
      url: `${base}/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    }).then((res) => {
      expect([200, 204]).to.include(res.status);
      cy.log("User deleted successfully");
    });
  }
});