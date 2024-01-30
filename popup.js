// Function to delete the keyword-URL pair
function deletePair(keyword) {
  chrome.storage.sync.remove(keyword, function() {
    loadPairs(); // Reload the list after deletion
  });
}

// Function to create an element for the keyword-URL pair with delete functionality
function createPairElement(keyword, url) {
  let div = document.createElement('div');
  let keywordInput = document.createElement('input');
  let urlInput = document.createElement('input');
  let saveButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  keywordInput.value = keyword;
  urlInput.value = url;
  saveButton.textContent = 'Save';
  deleteButton.textContent = 'Delete';

  saveButton.onclick = function() {
    savePair(keywordInput.value, urlInput.value);
  };
  deleteButton.onclick = function() {
    deletePair(keyword);
  };

  div.appendChild(keywordInput);
  div.appendChild(urlInput);
  div.appendChild(saveButton);
  div.appendChild(deleteButton);

  return div;
}

// Function to save the keyword-URL pair
function savePair(keyword, url) {
  let pair = {};
  pair[keyword] = url;
  chrome.storage.sync.set(pair);
}

// Function to create an element for adding a new keyword-URL pair
function createAddNewElement() {
  let div = document.createElement('div');
  let keywordInput = document.createElement('input');
  let urlInput = document.createElement('input');
  let addButton = document.createElement('button');

  keywordInput.placeholder = 'New Keyword';
  urlInput.placeholder = 'New URL';
  addButton.textContent = 'Add';

  addButton.onclick = function() {
    if (keywordInput.value && urlInput.value) {
      savePair(keywordInput.value, urlInput.value);
      keywordInput.value = '';
      urlInput.value = '';
      loadPairs();
    }
  };

  div.appendChild(keywordInput);
  div.appendChild(urlInput);
  div.appendChild(addButton);

  return div;
}

// Modified loadPairs function
function loadPairs() {
  chrome.storage.sync.get(null, function(items) {
    let pairsDiv = document.getElementById('pairs');
    pairsDiv.innerHTML = ''; // Clear current list

    // Add the 'Add New' element first
    pairsDiv.appendChild(createAddNewElement());

    for (let keyword in items) {
      let pairElement = createPairElement(keyword, items[keyword]);
      pairsDiv.appendChild(pairElement);
    }
  });
}

// Initial load
document.addEventListener('DOMContentLoaded', loadPairs);
