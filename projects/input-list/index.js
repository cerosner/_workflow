const form = document.getElementsByTagName('form')[0]
const list = document.getElementById('list')

function addToList() {
  let addedInput = form.listInput.value

  if (addedInput !== '') {
    const listItem = document.createElement('li')

    listItem.innerText = form.listInput.value
    list.appendChild(listItem)

    form.reset()
  }
}
