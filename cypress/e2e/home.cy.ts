describe('Orange Hub', () => {
  it('has the correct title', () => {
    cy.visit('/');
    cy.title().should('equal', 'OrangeHub');
  });

  it('can search a valid user', () => {
    class Response {
      body: any
    }

    cy.visit('/');
    cy.get('.home-search-input')
      .type('Otaviohenrique')
      .should('have.value', 'Otaviohenrique')

    cy.get('.btn').click()
    cy.get('.home-user-info').should('have.length', 1)

    cy.request('https://api.github.com/users/Otaviohenrique').as('user')
    cy.request('https://api.github.com/users/Otaviohenrique/starred').as('star')

    cy.get<Response>('@user').should((response) => {
      expect(response.body).to.have.property('login', 'OtavioHenrique') 
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('bio')
      expect(response.body).to.have.property('followers')
      expect(response.body).to.have.property('following') 
      expect(response.body).to.have.property('location') 
      expect(response.body).to.have.property('avatar_url') 
    })

    cy.get<Response>('@star').should((response) => {
      expect(response.body).to.have.length.of.at.least(1)
    })
  });

  it('has repositories', () => {
    cy.request('https://api.github.com/users/Otaviohenrique/repos?per_page=65').as('repo')

    cy.get<Response>('@repo').should((response) => {
      expect(response.body).to.have.length.of.at.least(1)
    })

    cy.get('.home-user-repositories-link').should('be.visible')
    cy.get('app-loading').should('not.exist')
    cy.get('.home-user-repositories-link a').click()
    cy.location('pathname').should('eq', '/repository-results')
    cy.get('app-loading').should('exist')

    cy.get('.repository-owner-container h1').should('have.text', 'Repositórios de OtavioHenrique')

    expect('.repository-info-container').to.have.length.of.at.least(1)
    cy.get('app-loading').should('not.exist')
  });

  it('should order repositories', () => {
    cy.get('select').select(1).should('have.value', 'nameDesc')
    cy.get('.repository-name h2').first().should('have.text', 'yalul');

    cy.get('select').select(2).should('have.value', 'starsDesc')
    cy.get('.repository-name h2').first().should('have.text', 'simpleAI');

    cy.get('select').select(0).should('have.value', 'nameAsc')
    cy.get('.repository-name h2').first().should('have.text', 'academic_system');

    cy.get('select').select(3).should('have.value', 'starsAsc')
    cy.get('.repository-name h2').first().should('have.text', 'academic_system');
  });

  it('should redirect to home', () => {
    cy.get('.header-container a').click()
    cy.location('pathname').should('eq', '/')
  });
})
