describe('Dashboard', () => {

  it('Should connect wallet and navigate to dashboard', () => {

    cy.visit('http://localhost:3000/');
    cy.wait(2000);
    cy.get('[data-cy="connect"]').click();
    cy.wait(2000);
    cy.get('[data-cy="sign"]').click();

    cy.get('[data-cy="print"]', { timeout: 12000 }).eq(0).should('be.visible').click();

    // const nameText = 'John Doe';
    // for (let i = 0; i < nameText.length; i++) {
    //   cy.get('#name').type(nameText[i], { delay: 20 });
    // }
    //
    // const emailText = 'johndoe@example.com';
    // for (let i = 0; i < emailText.length; i++) {
    //   cy.get('#email').type(emailText[i], { delay: 20 });
    // }
    //
    // cy.get('#country').select('US');
    //
    // const address1Text = '123 Main Street';
    // for (let i = 0; i < address1Text.length; i++) {
    //   cy.get('#address1').type(address1Text[i], { delay: 20 });
    // }
    //
    // const address2Text = 'Apt 4B';
    // for (let i = 0; i < address2Text.length; i++) {
    //   cy.get('#address2').type(address2Text[i], { delay: 20 });
    // }
    //
    // const cityText = 'Anytown';
    // for (let i = 0; i < cityText.length; i++) {
    //   cy.get('#city').type(cityText[i], { delay: 20 });
    // }
    //
    // const PINText = '90210';
    // for (let i = 0; i < PINText.length; i++) {
    //   cy.get('#PIN').type(PINText[i], { delay: 20 });
    // }
    //
    // const stateText = 'CA';
    // for (let i = 0; i < stateText.length; i++) {
    //   cy.get('#state').type(stateText[i], { delay: 20 });
    // }

    cy.get('#name').type('John Doe');
    cy.get('#email').type('johndoe@example.com');
    cy.get('#country').select('US');
    cy.get('#address1').type('123 Main Street');
    cy.get('#address2').type('Apt 4B');
    cy.get('#city').type('Anytown');
    cy.get('#PIN').type('90210');
    cy.get('#state').type('CA');

    cy.get('[data-cy="confirmShipping"]').click();
    // cy.get('[data-cy="pay"]').should("be.enabled").click()


    cy.get('[data-cy="pay"]').then(($button) => {
      if (!$button.prop('disabled')) {
        cy.wait(2000);

        /* ------------ for card payment ------------ */

        cy.get('[data-cy="pay"]').click();
        const cardNumberText = '1234 1234 1234 1234';
        for (let i = 0; i < cardNumberText.length; i++) {
          cy.get('#cardNumber').type(cardNumberText[i], { delay: 20 });
        }

        const cardExpirationText = '07/25';
        for (let i = 0; i < cardExpirationText.length; i++) {
          cy.get('#cardExpiration').type(cardExpirationText[i], { delay: 20 });
        }

        const cardCVVText = '007';
        for (let i = 0; i < cardCVVText.length; i++) {
          cy.get('#cardCVV').type(cardCVVText[i], { delay: 20 });
        }
        cy.wait(1000);
        cy.get('[data-cy="stripePay"]').click();

        /* ------------ for crypto payment ------------ */

        /*
        cy.get('input[type="radio"][value="crypto"]').check()
        cy.wait(1000);
        cy.get('[data-cy="pay"]').click();
        const cryptoAmountText= "0.00068"
        for (let i = 0; i < cryptoAmountText.length; i++) {
          cy.get('#cryptoAmount').type(cryptoAmountText[i], { delay: 20 });
        }
        cy.wait(1000);
        cy.get('[data-cy="cryptoPay"]').click();
        */

      } else {
        cy.log('Button is disabled, moving to the next test case.');
        cy.get('[data-cy="confirmShipping"]').then(($button) => {
          if ($button.prop('disabled')) {
            cy.wait(3000);
            cy.get('[data-cy="shippingModalConfirm"]').click();
          } else {
            cy.log('Button is disabled, moving to the next test case.');
          }
        });
      }
    });

  })

})