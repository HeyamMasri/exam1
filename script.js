
document.addEventListener('DOMContentLoaded', () => {
    let Specific = document.getElementById('Specific');
    let General = document.getElementById('General');

    function add_specific_item() {
        let item = document.getElementById('userInput').value;
        let fruit = document.getElementById('fruits');
        let legume = document.getElementById('legumes');

        if (item !== "" && (fruit.checked || legume.checked)) {
            if (fruit.checked) {
                let list = `<div class="alert alert-success fruit-item"><p><strong>Fruits!-</strong> ${item}</p></div>`;
                document.getElementById('fruitlist').classList.remove('d-none');
                document.getElementById('fruitsContainer').classList.remove('invisible');
                document.getElementById('fruitsContainer').insertAdjacentHTML('beforeend', list);
            } else if (legume.checked) {
                let list = `<div class="alert alert-warning legume-item"><p><strong>Legumes!-</strong> ${item}</p></div>`;
                document.getElementById('legumeslist').classList.remove('d-none');
                document.getElementById('legumesContainer').classList.remove('invisible');
                document.getElementById('legumesContainer').insertAdjacentHTML('beforeend', list);
            }

            // Clear the input field
            document.getElementById('userInput').value = '';
        } else {
            alert("Please enter an item and select either Fruits or Legumes.");
        }
    }

    function add_general() {
        let item = document.getElementById('userInput').value;
        let fruit = document.getElementById('fruits');
        let legume = document.getElementById('legumes');
        let list = '';

        if (item !== "" && (fruit.checked || legume.checked)) {
            if (fruit.checked) {
                list += `<div class="alert alert-info general-item" data-type="fruit"><p><strong>Fruits!-</strong> ${item}</p></div>`;
            } else if (legume.checked) {
                list += `<div class="alert alert-info general-item" data-type="legume"><p><strong>Legumes!-</strong> ${item}</p></div>`;
            }

            document.getElementById('allList').classList.remove('d-none');
            document.getElementById('all-container').classList.remove('invisible');
            document.getElementById('all-container').insertAdjacentHTML('beforeend', list);

            // Add event listener to the new item
            let newItem = document.querySelector('#all-container .general-item:last-child');
            newItem.addEventListener('click', moveToSpecificList);

            // Clear the input field
            document.getElementById('userInput').value = '';
        } else {
            alert("Please enter an item and select either Fruits or Legumes.");
        }
    }

    function moveToSpecificList(event) {
        let item = event.currentTarget;
        let type = item.getAttribute('data-type');
        if (type === 'fruit') {
            document.getElementById('fruitlist').classList.remove('d-none');
            document.getElementById('fruitsContainer').classList.remove('invisible');
            document.getElementById('fruitsContainer').appendChild(item);
        } else if (type === 'legume') {
            document.getElementById('legumeslist').classList.remove('d-none');
            document.getElementById('legumesContainer').classList.remove('invisible');
            document.getElementById('legumesContainer').appendChild(item);
        }
    }

    function addEventListenersToExistingItems() {
        let existingItems = document.querySelectorAll('#all-container .general-item');
        existingItems.forEach(item => {
            item.addEventListener('click', moveToSpecificList);
        });
    }

    let searchButton = document.getElementById('searchButton');
    function searchItems() {
        let searchTerm = document.getElementById('searchInput').value.toLowerCase();
        let items = document.querySelectorAll('.alert');

        items.forEach(item => {
            let itemName = item.textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.classList.add('highlight');
            } else {
                item.classList.remove('highlight');
            }
        });
    }
  let deleteButton = document.getElementById('deleteButton');
  function deleteItems() {
      let deleteTerm = document.getElementById('searchInput').value.toLowerCase();
      let items = document.querySelectorAll('.alert');

      items.forEach(item => {
          let itemName = item.textContent.toLowerCase();
          if (itemName.includes(deleteTerm)) {
              item.classList.add('fade-out');
              item.addEventListener('transitionend', () => {
                  item.remove();
              });
          }
      });
  }

    searchButton.addEventListener('click', searchItems);
    Specific.addEventListener("click", add_specific_item);
    General.addEventListener("click", add_general);
    deleteButton.addEventListener('click', deleteItems);

    // Add event listeners to existing items on page load
    addEventListenersToExistingItems();
});

