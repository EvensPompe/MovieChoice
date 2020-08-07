let select = document.getElementById("choix");
let btn = document.getElementById("button");
// let btnReset = document.getElementById("buttonReset");
let zoneResult = document.getElementById('zoneResult');
let prodArray = [];

// document.addEventListener('DOMContentLoaded', function () {
//   fetch('data.json')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     data.forEach(function (film,index) {
//       select.innerHTML += `<option id="${index}">${film.name}</option>`
//     })
//   }).catch(function (err) {
//     console.log(err);
//   })
// })
//
// btn.addEventListener('click', function () {
//   let choixFilm = select.value;
//   fetch('data.json')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     data.forEach(function (film) {
//       if (choixFilm == film.name) {
//         zoneResult.innerHTML = `
//         <h1>${film.name}</h1>
//         <h3>${film.realisator}<h3>
//         <h3>${film.production}</h3>
//         <h3>${film.release}</h3>
//         <p>${film.resume}</p> `;
//         if (tableData != null) {
//           tableData = [];
//           tableData.push(film.name, film.realisator, film.production,film.release,film.resume);
//           localStorage.setItem('Selection',JSON.stringify(tableData));
//         }
//       }
//     })
//   })
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


document.addEventListener("DOMContentLoaded", getAllTitles);

btn.addEventListener("click", getMovie);

function getAllTitles() {
  fetch("api.txt")
    .then(res => {
      return res.text()
    })
    .then(api_key => {
      for (var i = 1; i < 100; i++) {
        fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=${api_key}&language=fr`)
          .then(res => {
            return res.json()
          })
          .then(movie => {
            if (movie.title) {
              select.innerHTML += `<option id="${movie.id}">${movie.title}</option>`;
            }
          }).catch(err => {
            console.log(err);
          })
      }
    }).catch(err => {
      console.log(err);
    })
}

function getMovie(e) {
  let movieid = getId(select.value);
  let movieChoice = select.value;
  fetch("api.txt")
    .then(res => {
      return res.text()
    })
    .then(api_key => {
      fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${api_key}&language=fr&append_to_response=credits`)
        .then(function(response) {
          return response.json();
        })
        .then(function(movieSelected) {
          zoneResult.innerHTML = `
          <h1>${movieSelected.title}</h1>
          <h3>${getDirector(movieSelected)}<h3>
          <h3>${movieSelected.release_date.split("-").reverse().join("/")}</h3>
          <p>${movieSelected.overview}</p> `;
        }).catch(err => {
          console.log(err);
        })
    }).catch(err => {
      console.log(err);
    })
}

function getDirector(movie) {
  for (var person of movie.credits.crew) {
    if (person.job == "Director") {
      return person.name;
    }
  }
}

function getId(title) {
  for (var option of select.options) {
     if (option.value == title) {
       return option.id;
     }
  }
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
