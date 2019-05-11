// Your code here
const table = document.getElementsByTagName('table')[0]

function makeRow() {
  const row = document.createElement('tr')

  for (let i = 0; i < 20; i++) row.appendChild(document.createElement('td'))

  table.appendChild(row)
}

const addRowBtn = document.getElementById('add-row')
addRowBtn.addEventListener('click', makeRow)

let selectedColor = 'red'

const select = document.getElementsByTagName('select')[0]
select.addEventListener('change', event => {
  selectedColor = event.target.value
})

function colorize(event) {
  const cell = event.target

  if (cell.tagName === 'TD') {
    cell.className = (!cell.className.length || cell.className !== selectedColor) ? selectedColor : ''
  }
}

table.addEventListener('click', colorize)
