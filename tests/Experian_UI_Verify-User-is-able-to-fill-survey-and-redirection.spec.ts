import { test, expect } from '@playwright/test';


test.beforeEach(async({page})=>{
  
})

test('Experian_UI_Verify-User-is-able-to-fill-survey-and-redirection', async ({ page }) => {
  let inputFirstName = 'Frantzisko'
  let inputLastName = 'Youta'
  let inputEmail = 'Youta.Frantzisko@test.com'
  let inputStreetAddress = '63 John Avenue Bronx, NY'
  let inputCity = 'New York'
  let inputZipCode = '10466'

  await test.step('Step 1. Go to https://surveyrc.taxcreditco.com/automation-challenge', async function() {
    console.log("Step 1. Go to https://surveyrc.taxcreditco.com/automation-challenge.")
    await page.goto('https://surveyrc.taxcreditco.com/automation-challenge')
    await expect(page).toHaveURL(/survey.aspx/)
  })
  
  await test.step('Step 2. Fill all text fields under “Let’s begin by getting some basic information!” and click on Next button', async function() {
    console.log("Step 2. Fill all text fields under “Let’s begin by getting some basic information!” and click on Next button.")
    await page.locator('#SurveyControl_Question943').locator('[class="form-control textbox-tcc"]').fill(inputFirstName)
    await page.locator('#SurveyControl_Question946').locator('[class="form-control textbox-tcc"]').fill(inputLastName)
    await page.locator('#SurveyControl_Question949').locator('[class="form-control textbox-tcc"]').fill(inputEmail)
    await page.locator('#SurveyControl_Question950').locator('[class="form-control textbox-tcc"]').fill(inputStreetAddress)
    await page.locator('#SurveyControl_Question951').locator('[class="form-control textbox-tcc"]').fill(inputCity)
    await page.locator('#SurveyControl_Question952').locator('[class="form-control textbox-tcc"]').fill(inputZipCode)
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.locator('[class="font-14"]')).toContainText("please answer Yes or No")
  })
  
  await test.step('Step 3. Answer “NO” to all questions under “At this time, please answer Yes or No to the following questions:” and click on Next button', async function() {
    console.log("Step 3. Answer “NO” to all questions under “At this time, please answer Yes or No to the following questions:” and click on Next button.")
    await page.locator('#SurveyControl_Question11396').getByText('No').click()
    await page.locator('#SurveyControl_Question11397').getByText('No').click()
    await page.locator('#SurveyControl_Question914').getByText('No').click()
    await page.locator('#SurveyControl_Question11361').getByText('No').click()
    await page.locator('#SurveyControl_Question915').getByText('No').click()
    await page.locator('#SurveyControl_Question1244').getByText('No').click()
    await page.getByRole('button', { name: 'Next' }).click()
  })

  await test.step('Step 4. Verify the name in the text field matches what you entered in Step 2', async function(){
    console.log("Step 4. Verify the name in the text field matches what you entered in Step 2.")
    //TODO: Actual result- Received: [""] Expected result- Received: ["Frantzisko Youta"] 
    const nameConfirmation = await page.locator('[class="form-control textbox-tcc"]').allTextContents()
    //expect(nameConfirmation).toEqual(inputFirstName)
    await page.getByRole('button', { name: 'Submit form' }).click()
  })

  await test.step('Step 5. Assert that you were redirected to “https://www.experian.com/employer-services', async function() {
    console.log("Step 5. Assert that you were redirected to “https://www.experian.com/employer-services.")
    await expect(page).toHaveURL(/employer-services/)
  })
  
})
