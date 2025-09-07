describe('Challenge API DemoQA - full flow', () => {
  const base = 'https://demoqa.com';
  const userName = `yasmin.accenture_${Date.now()}`;
  const password = 'Qa@12345!a';

  it('creates user, generates token, authorizes, lists and reserves 2 books, validates user', () => {
    cy.request('POST', `${base}/Account/v1/User`, { userName, password })
      .then((res) => {
        expect([200, 201]).to.include(res.status);
        const userID = res.body.userID;
        expect(userID).to.be.a('string');

        return cy.request('POST', `${base}/Account/v1/GenerateToken`, { userName, password })
          .then((tokRes) => {
            expect(tokRes.status).to.eq(200);
            const token = tokRes.body.token;
            expect(token).to.be.a('string');

            return cy.request('POST', `${base}/Account/v1/Authorized`, { userName, password })
              .then((authRes) => {
                expect(authRes.status).to.eq(200);
                expect(authRes.body).to.eq(true);

                return cy.request('GET', `${base}/BookStore/v1/Books`)
                  .then((booksRes) => {
                    expect(booksRes.status).to.eq(200);
                    const books = booksRes.body.books;
                    expect(books.length).to.be.greaterThan(1);

                    const collectionOfIsbns = books.slice(0, 2).map(b => ({ isbn: b.isbn }));

                    return cy.request({
                      method: 'POST',
                      url: `${base}/BookStore/v1/Books`,
                      headers: { Authorization: `Bearer ${token}` },
                      body: { userId: userID, collectionOfIsbns },
                    }).then((addRes) => {
                      expect([200, 201]).to.include(addRes.status);

                      return cy.request({
                        method: 'GET',
                        url: `${base}/Account/v1/User/${userID}`,
                        headers: { Authorization: `Bearer ${token}` },
                      }).then((userRes) => {
                        expect(userRes.status).to.eq(200);
                        expect(userRes.body.username).to.eq(userName);
                        expect(userRes.body.books).to.have.length(2);
                        const returnedIsbns = userRes.body.books.map(b => b.isbn).sort();
                        const sentIsbns = collectionOfIsbns.map(i => i.isbn).sort();
                        expect(returnedIsbns).to.deep.eq(sentIsbns);
                      });
                    });
                  });
              });
          });
      });
  });
});
