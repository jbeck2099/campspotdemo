import { expect } from '@playwright/test'
import { test, campLocations } from '../fixtures/fixtures'
let dates = require('../data/date-ranges.json')
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

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

// test.describe('Location Tests', () => { //suspect failures have to do with (re)hydration
//     for (const location of campLocations){
//         test(`Testing location '${location}'`, async({searchPage}) => {
//             await searchPage.navigateHome();
//             let specifiedLocation = await searchPage.specifyLocation(location);
//             expect(specifiedLocation).toBe(true);
//             await searchPage.clickSearch();
//             await searchPage.validateSearchHasResults();
//         });
//     }
// })

test.describe('Date Tests', () => {
    for (const date of dates){
        test(`Testing '${date.testName}'`, async({searchPage}) => {
            await searchPage.navigateHome();
            


            await searchPage.specifyLocation(campLocations[randomInt(0, campLocations.length - 1)]) //choose a random location
            await searchPage.clickSearch();
            //validations
        });
    }
});
    
    
    
    // test('Hard-coded test for next month', async({searchPage}) => {
    //     await searchPage.navigateHome();
    //     await searchPage.selectDateRange('asdf', 'asdf'); //inputs aren't used currently
    //     await searchPage.clickSearch();
    //     await searchPage.validateSearchHasNoResults();
    // });





//placeholder for future addition
// test.describe('Guest Tests', () => {

// })




