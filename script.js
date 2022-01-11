// Part 4: Sorting the array alphabetically

// CREATE, READ, UPDATE, DELETE
var weedList = document.getElementById('weeds');
let weeds = new Promise(resolve => {
  fetch("weeds.json")
  .then(res => {
    if(res.status !== 200) {
      throw new Error('Cannot fetch the weeds');
    }
    return res.json()
  })
  .then(data => resolve(data))
  .catch(err => alert(err.message))
 
});
console.log(weeds);

let canibus = [
  {
    name: 'Cheese',
    strain: 'Indica',
    price:140
  },
  {
    name: 'Grade',
    strain: 'Local',
    price:20
  },
  {
    name: 'Super Turrie',
    strain: 'Home Grown',
    price:100
  },
  {
    name: 'Skunk',
    strain: 'Sativa',
    price:15
  },
  {
    name: 'Turrie',
    strain: 'Local',
    price:10
  },
  {
    name: 'Super Saiyin',
    strain: 'Home Grown',
    price: 300
  }
];

console.log(canibus)

// Counter: Number of canibus in the array
countCanibus = data => {
  var count = document.getElementById('counter');
  if (data) {
    count.innerHTML = 'There is a total of ' + data + ' different dagga.';
    // Show the heading text for the table
    document.getElementById('name').style.display = 'block';
  } else {
    count.innerHTML = 'No weed';
    // Hide the heading text for the table
    document.getElementById('name').style.display = 'none';
    document.getElementById('strain').style.display = 'none';
  }
};
// Read: GET
getCanibus = () => {
  var data = '';
  if (canibus.length > 0) {
    for (i = 0; i < canibus.length; i++) {
      data += '<tr>';
      data += '<td>' + [i+1] +'</td>';
      data += '<td>' + canibus[i].name + '</td>';
      data += '<td>' + canibus[i].strain + '</td>';
      data += '<td>' + 'R'+ canibus[i].price + '</td>';
      data += '<td><button class="editing myBtn1" onclick="editWeed(' + i + ')">Edit</button></td>';
      data += '<td><button class="deleting" onclick="deleteWeed(' + i + ')">Delete</button></td>';
      data += '</tr>';

     
    }
  }
  countCanibus(canibus.length);
  return weedList.innerHTML = data;
};
// Create: POST
addWeed = () => {
  try {
    var weedAdded = document.getElementById('add-weed').value.trim();
    var strainAdded = document.getElementById('add-strain').value.trim();
    var priceAdded = document.getElementById('add-price').value.trim();
    if(!weedAdded || !strainAdded) {
      throw new Error('You have not inserted a value in one of the input fields');
    }
    // Get the value
    var weedDetails = {
      name: weedAdded,
      strain: strainAdded,
      price: priceAdded
    }
    if (weedDetails) {
      // addweed the new value
      canibus.push(weedDetails);
      // Reset input value
      weedAdded.value = '';
      // Dislay the new list
      getCanibus();
    }
  } catch (err) {
    alert(err.message);
  }
};
// Update: PUT
editWeed = item => {
  var editweed = document.getElementById('edit-weed');
  var editstrain = document.getElementById('edit-strain');
  var editprice = document.getElementById('edit-price');
  // Display value in the field
  editweed.value = canibus[item].name;
  editstrain.value = canibus[item].strain;
  editprice.value = canibus[item].price;
  // Display fields
  document.getElementById('editForm').style.display = 'block';
  // When the form is submitted
  document.getElementById('saveEdit').onsubmit = () => {
    try {
      console.log(editweed.value.trim())
      if(!editweed.value.trim() || !editstrain.value.trim() || !editprice.value.trim()  )  {
        throw new Error('You have not inserted a value in one of the input fields');
      }
      // Get value
      var weedDetails = {
        name: editweed.value,
        strain: editstrain.value,
        price: editprice.value
      };

      if (weedDetails) {
        // editweed value
        canibus.splice(item, 1, weedDetails);
        // Display the new list
        getCanibus();
        // Hide fields
        closeInput();
      }
    } catch (err) {
      alert(err.message);
    }
  }
};
// Delete: Delete
deleteWeed = item => {
  // deleteweed the current row
  canibus.splice(item, 1);
  // Display the new list
  getCanibus();
};
// Search: weed Search
searchbar = () => {
  var searchedweed = document.getElementById('search').value.trim();
  try {
    if (!searchedweed) {
      throw new Error('Nothing was entered in the search bar');
    }
    // Filter all the canibus in the array with value typed into the input field
    let canibusFound = canibus.filter(weed => weed.name.toLowerCase().includes(searchedweed.toLowerCase()) || weed.strain.toLowerCase().includes(searchedweed.toLowerCase()) );

    if(canibusFound.length === 0) {
      throw new Error('No canibus were found');
    }
    canibus = canibusFound;
    getCanibus();
  } catch (err) {
    alert(err.message);
  }
};

// Sort: Sort canibus alphabetically
sortCanibus = () => {
  // Sorting alphabetically in decending order
  canibus.sort((a, b) => {
    let fa = a.name.toLowerCase(),
    fb = b.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });
  getCanibus();
}

// Sort: Sort strains alphabetically
sortPrice = () => {
  // Sorting alphabetically in decending order
  canibus.sort((a, b) => {
    let fa = a.price,
    fb = b.price;
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });
  getCanibus();
}

// Where the script starts. This executes when the file loads on the browser
getCanibus();

// Close Edit form
closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}

// modal1

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
