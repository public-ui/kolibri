import {NightwatchTests} from 'nightwatch';

const home: NightwatchTests = {
  'Github Title test': () => {
    browser
      .url('https://github.com')
      .assert.titleContains('GitHub');
  },

  'Github search for nightwatch repository': () => {
    browser
      .url('https://github.com/search')
      .clearValue('[placeholder=\'Search GitHub\']')
      .setValue('[placeholder=\'Search GitHub\']', 'nightwatch')
      .perform(function(this: any) {
        const actions = this.actions({async: true});

        return actions.keyDown(this.Keys['ENTER']).keyUp(this.Keys['ENTER']);
      })
      .waitForElementVisible('.header-search-input')
      .assert.valueContains('.header-search-input', 'nightwatch')
      .waitForElementVisible('.repo-list-item:first-child')
      .assert.textContains(
        '.repo-list-item:first-child',
        'End-to-end testing framework written in Node.js and using the W3C Webdriver API'
      );
  },

  'Github login with fake credentials': () => {
    browser
      .url('https://github.com/login')
      .clearValue('#login_field')
      .setValue('#login_field', 'nightwatch')
      .clearValue('#password')
      .setValue('#password', 'testpassword')
      .waitForElementVisible('[value=\'Sign in\']')
      .click('[value=\'Sign in\']')
      .assert.textContains(
        '#js-flash-container .flash.flash-error',
        'Incorrect username or password.'
      )
      .end();
  }
};

export default home;
