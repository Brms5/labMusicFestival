const BASE_URL = "http://localhost:3000";

describe("login", () => {
  it("when user enter valid email and password, it must logged in musicFestival", () => {
    // 0 - Abrir a pagina
    cy.visit(`${BASE_URL}/login`);
    // 1 - Preencher o email
    cy.get("#login-email").type("bruno@gmail.com");
    // 2 - Preencher a senha
    cy.get("#login-password").type("123456");
    // 3 - Clicar no botão de login
    cy.get("#login-button").click();
    // 4 - Verificar se o usuário está logado
    cy.visit(`${BASE_URL}/`);
  });
  it("when user enter invalid email and password, it must not logged in musicFestival", () => {
    // 0 - Abrir a pagina
    cy.visit(`${BASE_URL}/login`);
    // 1 - Preencher o email
    cy.get("#login-email").type("bruno@gmail");
    // 2 - Preencher a senha
    cy.get("#login-password").type("123456");
    // 3 - O botão de login deve estar desabilitado
    cy.get("#login-button").should("be.disabled");
  });
});

describe("musicFeed", () => {
  it("when user click on some week day, it must be redirected to musicFeed page", () => {
    // Interceptações
    // cy.intercept("GET", `${BASE_URL}/shows/Sunday`, (request) => {
    //   request.reply({
    //     statusCode: 200,
    //     body: {
    //       id: "d55a5ca8-4971-4f8e-b49c-5d462fc881f0",
    //       week_day: "Sunday",
    //       start_time: 21,
    //       end_time: 24,
    //       band_id: "86c25ca1-7b31-41cd-85ae-c8ca43db8868",
    //     },
    //   });
    // });

    // 0 - Abrir a pagina
    cy.visit(`${BASE_URL}/login`);
    // 1 - Preencher o email
    cy.get("#login-email").type("bruno@gmail.com");
    // 2 - Preencher a senha
    cy.get("#login-password").type("123456");
    // 3 - Clicar no botão de login
    cy.get("#login-button").click();
    // 4 - Verificar se o usuário está logado
    cy.visit(`${BASE_URL}/`);
    // 5 - Clicar no card de algum dia da semana
    cy.get(
      ".css-17yyt60-MuiPaper-root-MuiCard-root > .MuiButtonBase-root > #card-shows"
    ).click();
    // 6 - Verificar se o usuário foi redirecionado para a página de musicFeed
    cy.visit(`${BASE_URL}/shows/Sunday`);
    cy.url().should("be.equals", `${BASE_URL}/shows/Sunday`);
  });
});
