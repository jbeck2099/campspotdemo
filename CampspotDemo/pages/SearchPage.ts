import { Page, Locator, expect } from '@playwright/test'
import * as urls from '../data/urls.json'

class SearchPage{
    readonly page: Page;
    readonly homePageUrl: string = urls.prodUrl;
    readonly homePageTitle: string = 'Campspot - Campgrounds, RV resorts, glamping, and more.';
    readonly resultPageTitlePrefix: string = 'Available Locations near ';
    readonly noResultsMessage: string = 'Sorry, there are no campgrounds available matching your current search.';
    readonly noResultsDivLocator: string = '#geo-search-main>div>nav>div.search-results-none.app-no-search-results';
    readonly guestsTextLocator: string = "//div[@class='guests-picker-input-text app-guest-categories-label']";
    readonly locationControl: Locator;
    readonly datesControl: Locator;
    readonly nextMonthControl: Locator;
    readonly previousMonthControl: Locator;
    readonly guestsControl: Locator;
    readonly searchControl: Locator;
    readonly updateControl: Locator;
    readonly resultListControl: Locator;

    public constructor (page: Page){
        this.page = page;
        this.locationControl = page.getByPlaceholder('Where do you want to go?');
        this.datesControl = page.getByLabel('Check In Date: Add Dates');
        this.nextMonthControl = page.getByLabel('Next Month');
        this.previousMonthControl = page.getByLabel('Previous Month');
        this.guestsControl = page.getByRole('button', { name: 'Adults' });
        this.searchControl = page.getByRole('button', { name: 'Search' });
        this.updateControl = page.getByLabel('Update Search');
        this.resultListControl = page.locator('#geo-search-main>div>nav>ul');
    }

    async navigateHome(){
        await this.page.goto(this.homePageUrl);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateHomeAndValidatePageStartState(){
        await this.navigateHome();
        await this.validatePageStartState();
    }

    async specifyLocation(location: string){
        
        let maxRetryCount = 3;
        let currentRetryCount = 0;
        
        while (!(await this.locationControl.innerText()).includes(location)){
            
            if (currentRetryCount == maxRetryCount){
                return false;
            }
            
            await this.locationControl.click();
            await this.locationControl.fill(location);
            await this.page.waitForTimeout(3000)

            if (await this.page.locator('.location-search-results').isVisible()){
                await this.page.locator('.location-search-results-location-0').click();
                return true;
            }

            currentRetryCount++;
        }
    }

    async selectDateRange(startDate: string, endDate: string){
        await this.page.waitForTimeout(1000); //should be able to remove this
        await this.datesControl.click();





        //hard-coding date ranges for now...
        // await this.page.getByLabel('Next Month').click();
        // await this.page.getByLabel('Select Check-In Date Mon, Jan 1,').click();
        // await this.page.getByLabel('Select Check-Out Date Wed, Jan 3,').click();
    }

    async selectGuests(adults: number, children: number, pets: number){
        //placeholder
    }

    async clickSearch(){
        await this.page.waitForTimeout(1000); //should be able to remove this

        if (await this.page.title() == this.homePageTitle){
            await this.searchControl.click();
        }
        else{
            await this.updateControl.click(); //not tested yet
        }        
    }

    async searchForCampsites(location: string, startDate: string, endDate: string, adults: number, children: number, pets: number){
        this.navigateHome();
        this.specifyLocation(location);
        this.selectDateRange(startDate, endDate);
        this.selectGuests(adults, children, pets);
    }

    async validatePageStartState(){
        expect(await this.page.title()).toBe(this.homePageTitle);
        expect(await this.locationControl.innerText()).toBe('');
        expect(await this.page.locator(this.guestsTextLocator).innerText()).toBe('2 Adults');
    }

    async validateSearchHasNoResults(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000); //bandaid while figuring out rehydration issue
        expect(await this.page.title()).toContain(this.resultPageTitlePrefix);
        expect(await this.page.locator(this.noResultsDivLocator).innerText()).toBe(this.noResultsMessage);
    }
    
    async validateSearchHasResults(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000); //bandaid while figuring out rehydration issue
        expect(await this.page.title()).toContain(this.resultPageTitlePrefix);
        expect(await this.resultListControl).toHaveCount(1);        
    }

}

export default SearchPage;
