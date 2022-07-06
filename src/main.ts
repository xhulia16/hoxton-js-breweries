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

type State = {
    UsState: '',
    breweries: Brewery[]
}

let state: State = {
    UsState: '',
    breweries: []
}
function renderHeader() {
    let mainEl = document.querySelector('main')
    if (mainEl === null) return
    //    <h1>List of Breweries</h1>
    //<header class="search-bar">
    //  <form id="search-breweries-form" autocomplete="off">
    //    <label for="search-breweries"><h2>Search breweries:</h2></label>
    //    <input id="search-breweries" name="search-breweries" type="text" />
    //  </form>
    //</header>

    let searchBreweryH1El = document.createElement('h1')
    searchBreweryH1El.textContent = 'List of Breweries'

    let searchBreweryHeaderEl = document.createElement('header')
    searchBreweryHeaderEl.className = '"search-bar'

    let searchBreweryFormEl = document.createElement('form')
    searchBreweryFormEl.id = 'search-breweries-form'
    searchBreweryFormEl.autocomplete = 'off'

    let searchBreweryLabelEl = document.createElement('label')
    searchBreweryLabelEl.htmlFor = 'search-breweries'

    let searchBreweryH2El = document.createElement('h2')
    searchBreweryH2El.textContent = 'Search breweries:'

    let searchBreweryInput = document.createElement('input')
    searchBreweryInput.id = 'search-breweries'
    searchBreweryInput.name = 'search-breweries'
    searchBreweryInput.type = 'text'

    searchBreweryLabelEl.append(searchBreweryH2El)
    searchBreweryFormEl.append(searchBreweryLabelEl, searchBreweryInput)
    searchBreweryHeaderEl.append(searchBreweryFormEl)

    mainEl.append(searchBreweryH1El, searchBreweryHeaderEl)

}

function getBreweriesForState() {
    let city = state.UsState.replace(/ /g, '_')
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=10`)
        .then(resp => resp.json())
        .then(dataFromServer => {
            state.breweries = dataFromServer
            renderBreweryList()
        })
}

function listenToSelectStateForm() {
    let formEl = document.querySelector<HTMLFormElement>('#select-state-form')
    formEl?.addEventListener('submit', function (event) {
        event.preventDefault()
        let UsState = formEl['select-state'].value
        state.UsState = UsState
        getBreweriesForState()
    })
}

listenToSelectStateForm()

function renderBreweryList() {
    let mainEl = document.querySelector('main')
    if (mainEl === null) return
   
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

    for (let item of state.breweries) {
        let liEl = document.createElement('li')

        let h2El = document.createElement('h2')
        h2El.textContent = item.name

        let divEl = document.createElement('div')
        divEl.className = 'type'
        divEl.textContent = item.brewery_type

        let sectionEl1 = document.createElement('section')
        sectionEl1.className = 'address'

        let h3El = document.createElement('h3')
        h3El.textContent = 'Address:'

        let pEl1 = document.createElement('p')
        pEl1.textContent = item.street

        let pEl2 = document.createElement('p')
        pEl2.textContent = item.city

        sectionEl1.append(h3El, pEl1, pEl2)

        let sectionEl2 = document.createElement('section')
        sectionEl2.className = 'phone'

        let h3El2 = document.createElement('h3')
        h3El2.textContent = item.phone

        let pEl3 = document.createElement('p')
        pEl3.textContent = item.postal_code

        sectionEl2.append(h3El2, pEl3)

        let sectionEl3 = document.createElement('section')
        sectionEl3.className = 'link'

        let linkEl = document.createElement('a')
        linkEl.textContent = 'Visit Website'
        linkEl.href = item.website_url

        sectionEl3.append(linkEl)
        liEl.append(h2El, divEl, sectionEl1, sectionEl2, sectionEl3)
        ulEl.append(liEl)
        artcileEl.append(ulEl)
        mainEl.append(artcileEl)


    }
}
function render() {
    let mainEl = document.querySelector('main')
    if (mainEl === null) return
    mainEl.textContent = ''
    renderHeader()
    renderBreweryList()
}

listenToSelectStateForm()
render()