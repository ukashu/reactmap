function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawAndInput(page, name, tas) {
  await page.mouse.click(450, 350)
  await page.mouse.click(480, 320)
  await page.mouse.click(400, 300)
  await page.mouse.click(400, 300)

  await page.click("input#md")
  await page.keyboard.press('Backspace');
  await page.keyboard.type('6')

  await page.click("input#tas")
  await page.keyboard.press('Backspace');
  await page.keyboard.type(tas)

  await page.click("input#ws")
  await page.keyboard.press('Backspace');
  await page.keyboard.type('35')

  await page.click("input#wta")
  await page.keyboard.press('Backspace');
  await page.keyboard.type('269')

  await page.click("input#name")
  await page.keyboard.type(name)
}

module.exports = { sleep, drawAndInput }