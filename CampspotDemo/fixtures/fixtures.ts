import { test as base } from '@playwright/test'
import SearchPage from '../pages/SearchPage';

const CampLocations = [
    'Canyon Lake, Texas',
    'Waller, Texas',
    'Quarryville, Pennsylvania',
    'Lodi, California'
]

export const campLocations = CampLocations;

export const test = base.extend<{ searchPage: SearchPage }>({
    searchPage: async ({ page }, use) =>{
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },
});








