import { test, campLocations } from '../fixtures/fixtures'

// test.describe('Default State/Behavior Tests', () => {
//     test('Check initial page state', async({searchPage}) => {
//         await searchPage.navigateHomeAndValidatePageStartState();
//     });

//     test('Check results with default form values', async({searchPage}) => {
//         await searchPage.navigateHome();
//         await searchPage.clickSearch();
//         await searchPage.validateSearchHasNoResults();
//     })
// });

test.describe('Location Tests', () => { //suspect failures have to do with (re)hydration
    for (const location of campLocations){
        test(`Testing location '${location}'`, async({searchPage}) => {
            await searchPage.navigateHome();
            await searchPage.specifyLocation(location);
            await searchPage.clickSearch();
            await searchPage.validateSearchHasResults();
        });
    }
})

// test.describe('Date Tests', () => { //this should accept inputs and loop through them like the location tests above
//     test('Hard-coded test for next month', async({searchPage}) => {
//         await searchPage.navigateHome();
//         await searchPage.selectDateRange('asdf', 'asdf'); //inputs aren't used currently
//         await searchPage.clickSearch();
//         await searchPage.validateSearchHasNoResults();
//     });
// });

//placeholder for future addition
// test.describe('Guest Tests', () => {

// })

