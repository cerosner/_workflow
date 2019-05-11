// Your code here
const table = document.getElementsByTagName('table')[0]
const makeRow = () => {
  const row = document.createElement('tr')

  for (let i = 0; i < 20; i++) row.appendChild(document.createElement('td'))

  table.appendChild(row)
}

const addRowBtn = document.getElementById('add-row')
addRowBtn.addEventListener('click', makeRow)
