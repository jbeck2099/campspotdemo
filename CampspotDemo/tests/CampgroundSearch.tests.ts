import { expect } from '@playwright/test'
import { test, campLocations } from '../fixtures/fixtures'
import moment from 'moment';
import { randomInt } from '../helpers'
let dates = require('../data/date-ranges.json')


test.describe('Default State/Behavior Tests', () => {
    test('Check initial page state', async({searchPage}) => {
        await searchPage.navigateHomeAndValidatePageStartState();
    });

    test('Check results with default form values', async({searchPage}) => {
        await searchPage.navigateHome();
        await searchPage.clickSearch();
        // await searchPage.validateSearchHasNoResults(); //use this when testing the dev box (no results for my location)
        await searchPage.validateSearchHasResults(); //don't use when testing the dev box unless testing from a location with results
    })
});

test.describe('Location Tests', () => {
    for (const location of campLocations){
        test(`Testing location '${location}'`, async({searchPage}) => {
            await searchPage.navigateHome();
            let specifiedLocation = await searchPage.specifyLocation(location);
            expect(specifiedLocation).toBe(true);
            await searchPage.clickSearch();
            await searchPage.validateSearchHasResults();
        });
    }
})

// test.describe('Date Tests', () => {
//     for (const date of dates){
//         test(`Testing '${date.testName}'`, async({searchPage}) => {
//             await searchPage.navigateHome();
//             let startDate = moment().add(date.offset, 'days');
            




//             await searchPage.specifyLocation(campLocations[randomInt(0, campLocations.length - 1)]) //choose a random location
//             await searchPage.clickSearch();
//             //validations
//         });
//     }
// });

//placeholder for future addition
// test.describe('Guest Tests', () => {

// });

//placeholder for future addition
// test.describe('All input tests', () =>{

// });


