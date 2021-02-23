'use strict';

let maxClicks = 5;
let userTry = 1;
let allObject = [];
let container = document.getElementById('container');
let productArrayName = [];
let countArrImg = [];
let selectedImgArr = [];
function BussMall(productName, imgSource) {
  this.productName = productName;
  this.imgSource = 'img/' + imgSource;
  this.imgeCount = 0;
  this.selectedImgCount = 0;
  allObject.push(this);
  productArrayName.push(this.productName);
}

new BussMall('bag', 'bag.jpg');
new BussMall('banana', 'banana.jpg');
new BussMall('bathroom', 'bathroom.jpg');
new BussMall('boots', 'boots.jpg');
new BussMall('breakfast', 'breakfast.jpg');
new BussMall('bubblegum', 'bubblegum.jpg');
new BussMall('chair', 'chair.jpg');
new BussMall('cthulhu', 'cthulhu.jpg');
new BussMall('dog-duck', 'dog-duck.jpg');
new BussMall('dragon', 'dragon.jpg');
new BussMall('pen', 'pen.jpg');
new BussMall('pet-sweep', 'pet-sweep.jpg');
new BussMall('scissors', 'scissors.jpg');
new BussMall('shark', 'shark.jpg');
new BussMall('sweep', 'sweep.png');
new BussMall('tauntaun', 'tauntaun.jpg');
new BussMall('unicorn', 'unicorn.jpg');
new BussMall('usb', 'usb.gif');
new BussMall('water-can', 'water-can.jpg');
new BussMall('wine-glass', 'wine-glass.jpg');

let imgOneIndex;
let imgTwoIndex;
let imgThreeIndex;
let arrayLastNumber = [0, 0, 0];
function renderThreeRandomImg() {
  imgOneIndex = generateRandomImg();
  imgTwoIndex = generateRandomImg();
  imgThreeIndex = generateRandomImg();

  while ((imgOneIndex === imgTwoIndex) || (imgOneIndex === imgThreeIndex) || (imgTwoIndex === imgThreeIndex)) {
    imgTwoIndex = generateRandomImg();
    imgThreeIndex = generateRandomImg();
  }
  let imgOne = document.getElementById('imgOne');
  let imgTwo = document.getElementById('imgTwo');
  let imgThree = document.getElementById('imgThree');
  imgOne.setAttribute('src', allObject[imgOneIndex].imgSource);
  imgTwo.setAttribute('src', allObject[imgTwoIndex].imgSource);
  imgThree.setAttribute('src', allObject[imgThreeIndex].imgSource);
  allObject[imgOneIndex].imgeCount++;
  allObject[imgTwoIndex].imgeCount++;
  allObject[imgThreeIndex].imgeCount++;
  console.log(allObject[imgOneIndex].productName, allObject[imgTwoIndex].productName, allObject[imgThreeIndex].productName);
  arrayLastNumber[0] = imgOneIndex;
  arrayLastNumber[1] = imgTwoIndex;
  arrayLastNumber[2] = imgThreeIndex;


}

function generateRandomImg() {
  let random = Math.floor(Math.random() * allObject.length);
  while (arrayLastNumber.includes(random)) {
    random = Math.floor(Math.random() * allObject.length);
  }
  return random;
}

renderThreeRandomImg();

container.addEventListener('click', imgClik);
function imgClik(event) {
  if (userTry <= maxClicks) {
    console.log(userTry);
    if (event.target.id === 'imgOne') {
      userTry++;
      allObject[imgOneIndex].selectedImgCount++;
    }
    if (event.target.id === 'imgTwo') {
      userTry++;
      allObject[imgTwoIndex].selectedImgCount++;
    }
    if (event.target.id === 'imgThree') {
      userTry++;
      allObject[imgThreeIndex].selectedImgCount++;
    }
    event.preventDefault();
    addVote(); //save in local Storge
    renderThreeRandomImg();
  } else {
    let list = document.getElementById('list');
    let li;
    for (let j = 0; j < allObject.length; j++) {
      li = document.createElement('li');
      list.appendChild(li);
      li.textContent = `${allObject[j].productName} it has Chossed ${allObject[j].selectedImgCount} and it Show ${allObject[j].imgeCount}`;
      countArrImg.push(allObject[j].selectedImgCount);
      selectedImgArr.push(allObject[j].imgeCount);
    }
    container.removeEventListener('click', imgClik);
    document.getElementById('btn').style.display = 'block';

  }
  getVotes();


}




function showList() {
  document.getElementById('list').style.display = 'block';
  chartShow();

}
function chartShow() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: productArrayName,
      datasets: [{
        label: 'Time Of Image Show',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: selectedImgArr,
      }, {
        labels: productArrayName,
        label: 'Time Of Image Select',
        backgroundColor: 'rgb(220,150,132)',
        data: countArrImg,
      }]
    },
    // Configuration options go here
    options: {}
  });
}

function addVote() {
  let votes = JSON.stringify(allObject);
  localStorage.setItem('Votes', votes);

}

let listOfVotes = [];
function getVotes() {
  let getVote = localStorage.getItem('Votes');
  if (getVotes) {
    listOfVotes = JSON.parse(getVote);
  }
}

// getVotes();

function showResult() {
  getVotes();
  console.log(listOfVotes);
  let listSel = document.getElementById('selectedEl');
  let li;
  for (let i = 0; i < allObject.length; i++) {
    li = document.createElement('li');
    listSel.appendChild(li);
    li.textContent = `The   ${allObject[i].productName} has been Show ${listOfVotes[i].imgeCount} has been selected  ${listOfVotes[i].selectedImgCount} `;
  }
}

