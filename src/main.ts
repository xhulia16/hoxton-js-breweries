// Write your code here
type Brewery = 
    {
      address_2: string,
      address_3: string,
      brewery_type: string,
      city: string,
      country: string,
      county_province: string,
      created_at: string,
      id: number,
      latitude: string,
      longitude: string,
      name: string,
      obdb_id: string,
      phone: string,
      postal_code: string,
      state: string,
      street: string,
      updated_at: string,
      website_url: string
    }
  
    type State={
        UsState: '',
        breweries: Brewery[]
    }

let state: State = {
    UsState: '',
    breweries:[]
}

function getBreweriesForState(){
console.log(`THIS IS THE STATE:${state.UsState}`)
let city=state.UsState.replace(/ /g,'_')
console.log(city)
fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=10`)
    .then(resp => resp.json())
    .then(dataFromServer=>{
        state.breweries=dataFromServer
        renderBrewery()
    })
}

function listenToSelectStateForm () {
    let formEl = document.querySelector<HTMLFormElement>('#select-state-form')
    formEl?.addEventListener('submit', function (event) {
      event.preventDefault()
      let UsState = formEl['select-state'].value
      state.UsState = UsState
      getBreweriesForState()
    })
  }

listenToSelectStateForm()

function renderBrewery() {

    let mainEl = document.querySelector('main')
    if (mainEl === null) return
    mainEl.textContent = ''
    //<article>
    //    <ul class="breweries-list">
    //      <li>
    //        <h2>Snow Belt Brew</h2>
    //        <div class="type">micro</div>
    //        <section class="address">
    //          <h3>Address:</h3>
    //          <p>9511 Kile Rd</p>
    //          <p><strong>Chardon, 44024</strong></p>
    //        </section>
    //        <section class="phone">
    //          <h3>Phone:</h3>
    //          <p>N/A</p>
    //        </section>
    //        <section class="link">
    //          <a href="null" target="_blank">Visit Website</a>
    //        </section>
    //      </li>
    //      // More list elements
    //    </ul>
    //  </article>

    let artcileEl = document.createElement('article')

    let ulEl = document.createElement('ul')
    ulEl.className = 'breweries-list'

    let liEl = document.createElement('li')

    let h2El = document.createElement('h2')
    h2El.textContent = 'Snow Belt Brew'

    let divEl = document.createElement('div')
    divEl.className = 'type'
    divEl.textContent = 'micro'

    let sectionEl1 = document.createElement('section')
    sectionEl1.className = 'address'

    let h3El = document.createElement('h3')
    h3El.textContent = 'Address:'

    let pEl1 = document.createElement('p')
    pEl1.textContent = '9511 Kile Rd'

    let pEl2 = document.createElement('p')
    pEl2.textContent = 'Chardon, 44024'

    sectionEl1.append(h3El, pEl1, pEl2)

    let sectionEl2 = document.createElement('section')
    sectionEl2.className = 'phone'

    let h3El2 = document.createElement('h3')
    h3El2.textContent = 'Phone:'

    let pEl3 = document.createElement('p')
    pEl3.textContent = 'N/A'

    sectionEl2.append(h3El2, pEl3)

    let sectionEl3 = document.createElement('section')
    sectionEl3.className = 'link'

    let linkEl = document.createElement('a')
    linkEl.textContent = 'Visit Website'
    linkEl.href = 'https://www.youtube.com/'

    sectionEl3.append(linkEl)
    liEl.append(h2El, divEl, sectionEl1, sectionEl2, sectionEl3)
    ulEl.append(liEl)
    artcileEl.append(ulEl)
    mainEl.append(artcileEl)


}  

renderBrewery()