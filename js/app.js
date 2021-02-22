'use strict';


let maxClicks = 25;
let userTry = 1;
let allObject = [];
let container = document.getElementById('container');

function BussMall(productName, imgSource) {
  this.productName = productName;
  this.imgSource = 'img/' + imgSource;
  this.imgeCount = 0;
  this.imgShown = 0;
  allObject.push(this);
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
function renderThreeRandomImg() {
  imgOneIndex = generateRandomImg();
  imgTwoIndex = generateRandomImg();
  imgThreeIndex = generateRandomImg();

  while ((imgOneIndex === imgTwoIndex) || (imgOneIndex === imgThreeIndex) || (imgTwoIndex === imgThreeIndex)) {
    imgTwoIndex = generateRandomImg();
    imgThreeIndex = generateRandomImg();

  }

  console.log(`${imgOneIndex}  ${imgTwoIndex} ${imgThreeIndex}`);
  let imgOne = document.getElementById('imgOne');
  let imgTwo = document.getElementById('imgTwo');
  let imgThree = document.getElementById('imgThree');
  imgOne.setAttribute('src', allObject[imgOneIndex].imgSource);
  imgTwo.setAttribute('src', allObject[imgTwoIndex].imgSource);
  imgThree.setAttribute('src', allObject[imgThreeIndex].imgSource);
  allObject[imgOneIndex].imgeCount++;
  allObject[imgTwoIndex].imgeCount++;
  allObject[imgThreeIndex].imgeCount++;

}



function generateRandomImg() {
  let random = Math.floor(Math.random() * allObject.length);
  return random;
}

renderThreeRandomImg();

container.addEventListener('click', imgClik);

function imgClik(event) {
  console.log(event);

  if (userTry <= maxClicks) {

    console.log(userTry);
    if (event.target.id === 'imgOne') {
      userTry++;
      allObject[imgOneIndex].imgShown++;
    }
    if (event.target.id === 'imgTwo') {
      userTry++;
      allObject[imgTwoIndex].imgShown++;
    }
    if (event.target.id === 'imgThree') {
      userTry++;
      allObject[imgThreeIndex].imgShown++;
    }
    event.preventDefault();
    renderThreeRandomImg();
  } else {
    let list = document.getElementById('list');
    let li;
    for (let j = 0; j < allObject.length; j++) {
      li = document.createElement('li');
      list.appendChild(li);
      li.textContent = `${allObject[j].productName} it has Chossed ${allObject[j].imgShown} and it Show ${allObject[j].imgeCount}`;
    }
    container.removeEventListener('click', imgClik);
    document.getElementById('btn').style.display = 'block';
  }


}

function showul() {
  document.getElementById('list').style.display = 'block';
}
