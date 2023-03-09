const puppeteer = require('puppeteer')
const { login } = require('./helpers/userHelpers')
const { sleep } = require('./helpers/helperFunctions')

beforeEach(async()=>{
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  })
  page = await browser.newPage()

  await page.goto('http://localhost:5173')
  await page.reload()
})

describe('When not logged in ', ()=>{

  afterEach(async () => {
    await browser.close();
  });

  test('login button is displayed', async()=>{
  
    const googleSignIn = await page.$eval("div#signInDiv", el => el.innerHTML)
  
    const result = googleSignIn ? true : false
    expect(result).toEqual(true)
  })

  test('clicking login button opens google popup', async () => {

    const newPagePromise = new Promise(x => page.once('popup', x));

    await page.click("div#signInDiv")

    const newPage = await newPagePromise

    const result = newPage ? true : false
    expect(result).toEqual(true)
  })

  test('no flights show up', async() => {

    const savedFlights = await page.$eval("div#savedFlights", el => el.innerHTML)

    const result = savedFlights ? true : false
    expect(result).toEqual(false)
  })

  describe('when using no inputs ', ()=>{

    //later no calculate change TODO
    test('clicking calculate displays toast error', async() => {

      await page.click("button#send-data-to-calc")

      await page.waitForSelector("div.Toastify__toast")
      const toast = await page.$eval("div.Toastify__toast", el => el.innerHTML)

      const result = toast ? true : false
      expect(result).toEqual(true)
    })

    test('clicking save displays toast error', async() => {

      await page.click("button#save-data")

      await page.waitForSelector("div.Toastify__toast")
      const toast = await page.$eval("div.Toastify__toast", el => el.innerHTML)

      const result = toast ? true : false
      expect(result).toEqual(true)
    })

    test.todo('clicking open as form displays toast error')
  })

  describe('when using invalid inputs ', ()=>{
    test.todo('clicking calculate displays toast error')

    test.todo('clicking save displays toast error')
  })

  describe('when using valid inputs ', ()=>{

    //it should calculate, save response in storage and then open form with data loaded from storage TODO
    test.todo('open as form opens form in new tab')

    test('save data displays toast error', async() => {

      await page.click("input#md")
      await page.keyboard.type('6')

      await page.click("input#tas")
      await page.keyboard.type('65')

      await page.click("input#ws")
      await page.keyboard.type('35')

      await page.click("input#wta")
      await page.keyboard.type('269')

      await page.click("input#name")
      await page.keyboard.type('automated test flight')

      await page.click("button#save-data")
      await page.waitForSelector("div.Toastify__toast")
      const toast = await page.$eval("div.Toastify__toast", el => el.innerHTML)

      const result = toast ? true : false
      expect(result).toEqual(true)
    })
  })
})

describe('When logged in ', ()=>{
  //before each - create user in db and login
  let deleteUser
  beforeEach(async()=>{
    deleteUser = await login(page)
  })
  //after each - delete created user
  afterEach(async () => {
    deleteUser()
    await browser.close();
  });

  test.only('logout button is displayed', async () => {
    
    await sleep(2000)
  })

  describe('when logout button is clicked ', ()=>{

    test.todo('user localstorage is deleted')

    test.todo('page is refreshed')
  })

  test.todo('User cannot see other users flights')//in there save flight, logout, create another user, login, check if that user sees any flights

  describe('when using invalid inputs ', ()=>{

    //later no calculate change TODO
    test.todo('clicking calculate, save or open as form displays toast error')
  })

  describe('when using valid inputs ', ()=>{

    //it should calculate, save response in storage and then open form with data loaded from storage TODO
    test.todo('open as form opens form in new tab')

    test.todo('flight shows up on screen')
  })

  test.todo('clicking on saved flight refreshes the page and flight gets saved to localstorage')

  test.todo('clicking on clear refreshes the page and flights gets deleted from localstorage')

  test.todo('clicking on undo deletes last drawn point')
})