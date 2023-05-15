import {ExtendDescribeThis} from 'nightwatch';

interface CustomThis {
  duckDuckGoUrl: string;
  searchBox: string;
  submitButton: string;
}

// callback passed to `describe` should be a regular function (not an arrow function).
describe('duckduckgo example', function(this: ExtendDescribeThis<CustomThis>) {
  this.duckDuckGoUrl = 'https://duckduckgo.com';
  this.searchBox = 'input[name=q]';
  this.submitButton = '*[type=submit]';

  // callback can be a regular function as well as an arrow function.
  beforeEach(function(this: ExtendDescribeThis<CustomThis>, browser) {
    browser.navigateTo(this.duckDuckGoUrl!);
  });

  // no need to specify `this` parameter when passing an arrow function
  // as callback to `it`.
  it('Search Nightwatch.js and check results', (browser) => {
    browser
      .waitForElementVisible(this.searchBox!)
      .sendKeys(this.searchBox!, ['Nightwatch.js'])
      .click(this.submitButton!)
      .assert.visible('.results--main')
      .assert.textContains('.results--main', 'Nightwatch.js');
  });
});
