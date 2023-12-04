import { test, campLocations } from '../fixtures/fixtures'

test.describe('Default State/Behavior Tests', () => {
    test('Check initial page state', async({campspotPage}) => {
        await campspotPage.navigateHomeAndValidatePageStartState();
    });

    test('Check results with default form values', async({campspotPage}) => {
        await campspotPage.navigateHome();
        await campspotPage.clickSearch();
        await campspotPage.validateSearchHasNoResults();
    })
});

test.describe('Location Tests', () => {
    for (const location of campLocations){
        test(`Testing location '${location}'`, async({campspotPage}) => {
            await campspotPage.navigateHome();
            await campspotPage.specifyLocation(location);
            await campspotPage.clickSearch();
            await campspotPage.validateSearchHasResults();
        });
    }
})

test.describe('Date Tests', () => { //this should accept inputs and loop through them like the location tests above
    test('Hard-coded test for next month', async({campspotPage}) => {
        await campspotPage.navigateHome();
        await campspotPage.selectDateRange();
        await campspotPage.clickSearch();
        await campspotPage.validateSearchHasNoResults();
    });
});

//placeholder for future addition
// test.describe('Guest Tests', () => {

// })

