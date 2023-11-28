const puppeteer = require('puppeteer')

const fs = require('fs')

const getFlights = async () => {

  //start puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  })

  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)

  //goes to google flights with destination set to Hawaii, and date as well 
  await page.goto(
    'https://www.google.com/travel/flights?tfs=CBwQARolEgoyMDIzLTEwLTI2agcIARIDTVNQcg4IAxIKL20vMDJocmgwX0ABSAFwAYIBCwj___________8BmAEC&hl=en&gl=us&curr=USD',
    { waitUntil: 'networkidle2' }
  )

  //grab the relevant elements to scrape from 
  let inputClass = ' TP4Lpb eoY5cb j0Ppje'
  let nextBtnClass = ' d53ede rQItBb FfP4Bc Gm3csc'
  let monthClass = ' Bc6Ryd ydXJud'
  let monthNameClass = ' BgYkof B5dqIf qZwLKe'

  let cellClass = ' p1BRgf KQqAEc'
  //.BgYkof.B5dqIf.qZwLKe

  inputClass = inputClass.replace(/\s/g, '.')
  nextBtnClass = nextBtnClass.replace(/\s/g, '.')
  monthClass = monthClass.replace(/\s/g, '.')
  monthNameClass = monthNameClass.replace(/\s/g, '.')

  console.log(inputClass)
  console.log(nextBtnClass)
  console.log(monthClass)

  //click on depart date input to open calendar
  await page.waitForSelector(inputClass)
  await page.click(inputClass)

  //clear the current input text, and enter "today" to go to current date
  let inputElement = await page.$(inputClass)

  await inputElement.click({ clickCount: 3 })
  await page.$eval(inputClass, (input) => {
    input.value = '' // Set the input field value to an empty string
  })
  await page.waitForTimeout(2000)
  await page.type(inputClass, 'today')

  await page.waitForTimeout(3000)
  const cells = await page.$$(`div.p1BRgf.KQqAEc`)

  //grab all data
  console.log('Scraping now...')

  /*
  -Loop thru each cell and grab data
    ->No need to go thru month, then week, day etc. since this process is messy with 
    many nested elements 
        -Both the date and price are available inside each individual cell 
  */
  for (const cell of cells) {
    let date = 'Null'
    let dateNumber = 'Null'
    let price = 'Null'

    try {
      date = await page.evaluate(
        (el) => el.querySelector('.eoY5cb.CylAxb.sLG56c.yCya5').ariaLabel,
        cell
      )

      dateNumber = await page.evaluate(
        (el) => el.querySelector('.eoY5cb.CylAxb.sLG56c.yCya5').textContent,
        cell
      )

      price = await page.evaluate(
        (el) => el.querySelector('.CylAxb.n3qw7.UNMzKf.julK3b').textContent,
        cell
      )

      console.log(date)
      console.log(price)
      console.log(
        '----------------------------------------------------------------'
      )

      //we can only look up to 12 months ahead, then next button is is hidden
      if (date.split(' ')[1] == 'Sep' && dateNumber === '27') {
        await page.waitForTimeout(8000)
        console.log('Last month reached')
        break
      }


      //we MUST click next button to load more data; isn't all loaded at once for price
      if (dateNumber === '27') {//should be good enough to account for February 
        await page.waitForTimeout(1000)
        page.click(nextBtnClass)
        await page.waitForTimeout(1000)
      }
 
      //Prevent cells without price; in our case its the days BEFORE current date
      // which has no price data 
      if (price.trim() !== '') {
        fs.appendFile(
          'flights.csv',
          `${date.replace(/,/g, '')},${price}\n`,
          function (err) {
            if (err) throw err
          }
        )
      }
    } catch (error) {}
  }


  await browser.close()

}

getFlights()

/*
NOTES:

-wait for some time
-clear input field
https://evanhalley.dev/post/clearing-input-field-puppeteer/
*/
