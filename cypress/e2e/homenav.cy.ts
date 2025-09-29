import {leftMenuItems, footerMenuItems, homeMenuItems} from '../fixtures/testdata';

describe('Navigation Tests', () => {
    it('navigation buttons exist and are functional', () => {
      Object.values(leftMenuItems).forEach((item: { title: string; url: string }) => {
        cy.get('ul.leftmenu')
        .find(`a:contains("${item.title}")`)
        .should('have.attr', 'href')
        .and('include', item.url)
      });

      Object.values(footerMenuItems).forEach((item: { title: string; url: string }) => {
        cy.get('#footerPanel')
        .find(`a:contains("${item.title}")`)
        .should('have.attr', 'href')
        .and('include', item.url)
        });

      Object.values(homeMenuItems).forEach((item: { title: string; url: string }) => {
        cy.get('ul.button')
        .find(`a:contains("${item.title}")`)
        .should('have.attr', 'href')
        .and('include', item.url)
      })
    })
  })
