import { Page, Locator, expect } from '@playwright/test'

class CampspotPage{
    readonly page: Page;
    readonly homepageUrl: string = '';
    readonly homepageTitle: string = 'Campspot - Campgrounds, RV resorts, glamping, and more.';
    readonly locationControl: Locator;
    readonly datesControl: Locator;
    readonly guestsControl: Locator;
    readonly searchControl: Locator;

    public constructor (page: Page){
        this.page = page;
        this.locationControl = page.getByPlaceholder('Where do you want to go?');
        this.datesControl = page.getByLabel('Check In Date: Add Dates');
        this.guestsControl = page.getByRole('button', { name: 'Adults' });
        this.searchControl = page.getByRole('button', { name: 'Search' });
    }

    async navigateHome(){
        await this.page.goto(this.homepageUrl);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateHomeAndValidatePageStartState(){
        await this.navigateHome();
        await this.validateHomePageStartState();
    }

    async specifyLocation(location: string){
        await this.locationControl.click();
        await this.locationControl.fill(location);
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: `${location}` }).click();
    }

    async selectDateRange(){ //parameterize this to accept dates
        await this.page.waitForTimeout(1000);
        await this.datesControl.click();
        //hard-coding date ranges for now...
        await this.page.getByLabel('Next Month').click();
        await this.page.getByLabel('Select Check-In Date Mon, Jan 1,').click();
        await this.page.getByLabel('Select Check-Out Date Wed, Jan 3,').click();
    }

    async clickSearch(){
        await this.page.waitForTimeout(1000);
        await this.searchControl.click();
    }

    async validateHomePageStartState(){
        expect(await this.page.title()).toBe(this.homepageTitle);
        expect(await this.locationControl.innerText()).toBe('');
        expect(await this.page.locator("//div[@class='guests-picker-input-text app-guest-categories-label']").innerText()).toBe('2 Adults');
    }

    async validateSearchHasNoResults(){
        await this.page.waitForLoadState('domcontentloaded');
        // expect(await this.page.title()).toContain('Available Locations near ');
        expect(await this.page.locator("#geo-search-main>div>nav>div.search-results-none.app-no-search-results").innerText()).toBe('Sorry, there are no campgrounds available matching your current search.');
    }
    
    async validateSearchHasResults(){
        await this.page.waitForLoadState('domcontentloaded');
        // expect(await this.page.title()).toContain('Available Locations near ');
        expect(await this.page.locator('#geo-search-main>div>nav>ul')).toHaveCount(1);
    }

}

export default CampspotPage;
