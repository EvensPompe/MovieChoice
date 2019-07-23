let select = document.getElementById("choix");
let btn = document.getElementById("button");
// let btnReset = document.getElementById("buttonReset");
let zoneResult = document.getElementById('zoneResult');
let tableData = [];
let reRableData = [];

document.addEventListener('DOMContentLoaded', function () {
  fetch('data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.forEach(function (film,index) {
      select.innerHTML += `<option id="${index}">${film.name}</option>`
    })
  }).catch(function (err) {
    console.log(err);
  })
})

btn.addEventListener('click', function () {
  let choixFilm = select.value;
  fetch('data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.forEach(function (film) {
      if (choixFilm == film.name) {
        zoneResult.innerHTML = `
        <h1>${film.name}</h1>
        <h3>${film.realisator}<h3>
        <h3>${film.production}</h3>
        <h3>${film.release}</h3>
        <p>${film.resume}</p> `;
        if (tableData != null) {
          tableData = [];
          tableData.push(film.name, film.realisator, film.production,film.release,film.resume);
          localStorage.setItem('Selection',JSON.stringify(tableData));
        }
      }
    })
  })
})

reRableData = JSON.parse(localStorage.getItem('Selection'));
for (var i = 0; i < reRableData.length; i++) {
  zoneResult.innerHTML = `
  <h1>${reRableData[0]}</h1>
  <h3>${reRableData[1]}<h3>
  <h3>${reRableData[2]}</h3>
  <h3>${reRableData[3]}</h3>
  <p>${reRableData[4]}</p>
  `
}




// -----------------------------------------------------------

// document.addEventListener('DOMContentLoaded', dataChoix)
// function dataChoix() {
//   let xhr = new XMLHttpRequest();
//   let method = "GET";
//   let url = "./data.json";
//   xhr.open(method,url);
//   xhr.onreadystatechange = function () {
//     if (this.readyState === XMLHttpRequest.DONE) {
//          if (this.status === 200) {
//            var data = JSON.parse(this.responseText);
//              data.forEach(function (items,index) {
//              select.innerHTML += `<option id="${index}">${items.name}</option>`;
//            })
//        }
//     }
//   }
//   xhr.send();
// }
//
// btn.addEventListener('click',function (e) {
//   let choixFilm = select.value;
//   console.log(choixFilm);
//   let xhr = new XMLHttpRequest();
//   let method = "GET";
//   let url = "./data.json";
//   xhr.open(method,url);
//   xhr.onreadystatechange = function () {
//     if (this.readyState === XMLHttpRequest.DONE) {
//          if (this.status === 200) {
//            var data = JSON.parse(this.responseText);
//              data.forEach(function (items,index) {
//              if(choixFilm == items.name){
//              zoneResult.innerHTML = `
//              <h1>${items.name}</h1>
//              <h3>${items.realisator}<h3>
//              <h3>${items.production}</h3>
//              <h3>${items.release}</h3>
//              <p>${items.resume}</p> `;
//              if (tableData != null) {
//                tableData = [];
//                tableData.push(items.name, items.realisator, items.production,items.release,items.resume);
//                localStorage.setItem('Selection',JSON.stringify(tableData));
//              }
//              }
//            })
//        }
//     }
//   }
//   xhr.send();
// })
//
// reRableData = JSON.parse(localStorage.getItem('Selection'));
// for (var i = 0; i < reRableData.length; i++) {
//   zoneResult.innerHTML = `
//   <h1>${reRableData[0]}</h1>
//   <h3>${reRableData[1]}<h3>
//   <h3>${reRableData[2]}</h3>
//   <h3>${reRableData[3]}</h3>
//   <p>${reRableData[4]}</p>
//   `
// }
