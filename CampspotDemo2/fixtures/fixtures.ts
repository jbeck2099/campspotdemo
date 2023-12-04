import { test as base } from '@playwright/test'
import CampspotPage from '../pages/CampspotPage';

const CampLocations = [
    'Canyon Lake, Texas',
    'Waller, Texas',
    'Quarryville, Pennsylvania',
    'Lodi, California'
]

export const campLocations = CampLocations;

export const test = base.extend<{ campspotPage: CampspotPage }>({
    campspotPage: async ({ page }, use) =>{
        const campspotPage = new CampspotPage(page);
        await use(campspotPage);
    },
});