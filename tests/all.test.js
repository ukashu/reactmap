const puppeteer = require('puppeteer')
const { login } = require('./helpers/userHelpers')
const { sleep } = require('./helpers/helperFunctions')

beforeEach(async()=>{
  browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null
  })
  page = await browser.newPage()

  await page.goto('http://localhost:5173')
  await page.reload() //hacky - shouldn;t be here TODO
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

  test.todo('MD auto button works')

  test.todo('wind auto button works')

  describe('when using no inputs ', ()=>{

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
    test.todo('calculate and open as form opens form in new tab')

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
  let deleteUser

  //before each - create user in db and login
  beforeEach(async()=>{
    deleteUser = await login(page)
  })

  //after each - delete created user
  afterEach(async () => {
    deleteUser()
    await browser.close();
  });

  test('logout button is displayed', async () => {

    await page.waitForSelector("div.logged-in-div")
    const button = await page.$eval("div.logged-in-div", el => el.innerHTML)

    const result = button ? true : false
    expect(result).toEqual(true)
  })

  //the logout button doesn;t work for whatever reason
  describe('when logout button is clicked ', ()=>{
  
    beforeEach(async() => {

      await sleep(400)

      const element = await page.$("button#logout")
      await page.evaluate(element => element.click(), element)
    })

    test('user localstorage is deleted', async() => {

      await sleep(400)

      const user = await page.evaluate(() => {
        const user = localStorage.getItem('user');
        return user
      });

      const result = user ? true : false
      expect(result).toEqual(false)
    })

    test('page is refreshed', async() => {

      await page.waitForSelector("div#signInDiv")
      const googleSignIn = await page.$eval("div#signInDiv", el => el.innerHTML)
  
      const result = googleSignIn ? true : false
      expect(result).toEqual(true)
    })
  })

  test('User cannot see other users flights', async() => {//in there save flight, logout, create another user, login, check if that user sees any flights

    //draw flight
    await page.mouse.click(450, 350)
    await page.mouse.click(480, 320)
    await page.mouse.click(400, 300)
    await page.mouse.click(400, 300)

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

    //save flight
    await page.click("button#save-data")

    //logout (delete localstorage)
    await page.evaluate(() => {
      localStorage.removeItem('user');
    });

    //refresh page
    await page.reload()

    //login 
    const deleteUser2 = await login(page)

    //get result
    const savedFlights = await page.$eval("div#savedFlights", el => el.innerHTML)

    //logout
    deleteUser2()

    //check
    const result = savedFlights ? true : false
    expect(result).toEqual(false)
  })

  test.todo('MD auto button works')

  test.todo('wind auto button works')

  describe('when using no inputs ', ()=>{

    //later no calculate change TODO
    test('clicking calculate and open as form displays toast error', async() => {

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
  })

  describe('when using invalid inputs ', ()=>{
    test.todo('clicking calculate and open as form displays toast error')

    test.todo('clicking save displays toast error')
  })

  describe('when using valid inputs ', ()=>{

    //it should calculate, save response in storage and then open form with data loaded from storage TODO
    test.todo('calculate and open as form opens form in new tab')

    test('flight shows up on screen', async() => {
      await page.mouse.click(450, 350)
      await page.mouse.click(480, 320)
      await page.mouse.click(400, 300)
      await page.mouse.click(400, 300)

      await page.click("input#md")
      await page.keyboard.type('6')

      await page.click("input#tas")
      await page.keyboard.type('65')

      await page.click("input#ws")
      await page.keyboard.type('35')

      await page.click("input#wta")
      await page.keyboard.type('269')

      await page.click("input#name")
      await page.keyboard.type('automated test flight 1')

      //save flight
      await page.click("button#save-data")

      //refresh page
      await page.reload()

      const savedFlights = await page.$eval("div#savedFlights", el => el.innerHTML)

      //check
      const result = savedFlights ? true : false
      expect(result).toEqual(true)
      });
    })

  test('clicking on saved flight refreshes the page and flight gets saved to localstorage', async() => {
    //create flight 1
    await page.mouse.click(450, 350)
    await page.mouse.click(480, 320)
    await page.mouse.click(400, 300)
    await page.mouse.click(400, 300)

    await page.click("input#md")
    await page.keyboard.type('6')

    await page.click("input#tas")
    await page.keyboard.type('65')

    await page.click("input#ws")
    await page.keyboard.type('35')

    await page.click("input#wta")
    await page.keyboard.type('269')

    await page.click("input#name")
    await page.keyboard.type('automated test flight 1')

    await page.click("button#save-data")

    await sleep(300)

    await page.click('button#clear')
    await sleep(300)

    //create flight 2
    await page.mouse.click(550, 550)
    await page.mouse.click(580, 520)
    await page.mouse.click(500, 500)
    await page.mouse.click(500, 500)

    await page.click("input#md")
    await page.keyboard.type('6')

    await page.click("input#tas")
    await page.keyboard.type('65')

    await page.click("input#ws")
    await page.keyboard.type('35')

    await page.click("input#wta")
    await page.keyboard.type('269')

    await page.click("input#name")
    await page.keyboard.type('automated test flight 2')

    await page.click("button#save-data")

    await sleep(300)

    //refresh page
    await page.reload()

    //click saved flight 1
    await page.click("div#savedFlights div:first-child")

    await sleep(300)

    //check if name input value is automated test flight 1
    const name = await page.$eval("input#name", el => el.value)

    console.log(name)

    expect(name).toEqual('automated test flight 1')
  })

  test('clicking on clear refreshes the page and flights gets deleted from localstorage', async() => {
    await sleep(400)

    const savedFlight = await page.evaluate(() => {
      const savedFlight = localStorage.getItem('saved-flight');
      return savedFlight
    });

    console.log(savedFlight)

    const result = savedFlight ? true : false
    expect(result).toEqual(false)
  })

  test.todo('clicking on undo deletes last drawn point')
})