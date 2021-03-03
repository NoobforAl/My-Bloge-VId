///======= ---index Value---
var nmae_cy = document.getElementById('nmae_cy');
var time_t = document.getElementById('time_t');
var icon_wa = document.getElementById('icon_wa');
var temp_c = document.getElementById('temp_c');
var Hum_abr = document.getElementById('Hum_abr');
var speed_h = document.getElementById('speed_h');
var Day_5 = document.getElementById('5_Day');
var UV_i = document.getElementById('UV_in');
let brbr = document.getElementById('brbr');
let ilHis = document.getElementById('hstory');
let loadeh = '';




//========= ---Read History---
setInterval(() => {
        fetch('/gethis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                loadeh = '';
                const p = data.length;
                if (p > 0) {
                    for (let j = (data.length) - 1; j > -1; j--) {
                        loadeh += `<li class="list-group-item"><a onclick="serchfh('${data[j].Historyy}')">${data[j].Historyy}</a><spam>&nbsp;</spam><a class="btn btn-danger" onclick="dlthh('${data[j]._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                 <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                </a></li>`;
                    }
                } else {
                    loadeh += `<li class="list-group-item"><div class="alert alert-warning">History Clear!!</div></li>`;
                }
                ilHis.innerHTML = loadeh;
            });
    },
    1000);







//========= ---Delete History---**************************
function dlthh(id) {
    fetch(`/dlet/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then((data) => {
            window.location.href = data.redirect;
        })
        .catch(err => console.log(err));

    alert('History Deleted!!');

}









//========= ---one click to serch history---
function serchfh(sech) {



    ///========== ---Tody Deta ---
    const time = new Date();
    let tim = time.toDateString();



    ///========== ---Today ---
    fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ City: sech })
        })
        .then(res => res.json())
        .then(data => {
            if (data !== false) {
                nmae_cy.innerHTML = data.name;
                time_t.innerHTML = `(${tim})`;
                icon_wa.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
                temp_c.innerHTML = `Temperature: ${Math.round(data.main.temp-273)} &deg;C`;
                Hum_abr.innerHTML = `Humidity: ${data.main.humidity} %`;
                speed_h.innerHTML = `Wind Speed:${data.wind.speed} M/S`;
                brbr.innerHTML = '<hr class="my-4"><br/><h3>5-Day Forecast:</h3>';

            } else {
                alert(`Not Fund City (${sech})`);

            }
        });



    ///========== ---UV_index ---
    fetch('/UV', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ City: sech })
        })
        .then(res => res.json())
        .then(data => {
            if (data !== false) {
                ///======  ----UV Index Color!!----
                if (data.value <= 2) {
                    UV_i.innerHTML = ` UV index:<samp id="UV_in" class="alert alert-success">${data.value}</samp> `;
                } else if (data.value > 2 && data.value < 8) {
                    UV_i.innerHTML = ` UV index:<samp id="UV_in" class="alert alert-warning">${data.value}</samp> `;
                } else if (data.value >= 8) {
                    UV_i.innerHTML = ` UV index:<samp id="UV_in" class="alert alert-danger">${data.value}</samp> `;
                }
            } else {}
        });




    ///========== ---5 Day--- 
    fetch('/5_Day', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ City: sech })
        })
        .then(res => res.json())
        .then(data => {
            let inner = '';
            if (data !== false) {
                data.list.forEach((A, B) => {
                    if (B == 6 || B == 13 || B == 21 || B == 29 || B == 37) {
                        inner += `
                    <div class="col-sm-2">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${A.dt_txt.slice(0,11)}
                                </h5>
                                <p class="card-text">
                                <img src="http://openweathermap.org/img/wn/${A.weather[0].icon}@2x.png">
                                </p>
                                <p class="card-text">Temperature:
                                   ${Math.round(A.main.temp-273)}&deg;C
                                </p>
                                <p class="card-text"> Humidity:
                                    ${A.main.humidity}
                                    </p>
                            </div>
                        </div>
                    </div>
                        `;
                    }
                    Day_5.innerHTML = inner;
                })
            } else {}
        });


    ///=====     ----Alarm For Error Empthy----
    let audio = new Audio("/Audio/Fresh.mp3");
    audio.play();
}



///=====     ----Save serch Hestory !1----
function saveHis() {
    fetch('/gethis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                let sech = document.getElementById('serch_His').value;
                ///=====     ----Check List----
                for (let j = 0; j < data.length; j++) {
                    if (data[j].Historyy == sech) {
                        break;
                    } else if (j == (data.length) - 1) {
                        let a = document.getElementById('serch_His').value;
                        fetch(`/HISadd/${a}`, {
                                method: 'POST'
                            })
                            .then(response => response.json())
                            .then((data) => { window.location.href = data.redirect; })
                            .catch(err => console.log(err));

                        break;
                    }
                }
            } else {

                let a = document.getElementById('serch_His').value;
                fetch(`/HISadd/${a}`, {
                        method: 'POST'
                    })
                    .then(response => response.json())
                    .then((data) => { window.location.href = data.redirect; })
                    .catch(err => console.log(err));
            }
        });
}




//========= ---Serch on City---
function serch() {


    ///=====      ----Value Serche----
    let sech = document.getElementById('serch_His').value;


    ///=====      ----IF Value Empty----
    if (sech == null || sech === '') {
        alert('serch is empthy');

    } else {

        ///========== ---Get City ---
        let sech = document.getElementById('serch_His').value || document.getElementById('oneH').value;

        ///========== ---Tody Deta ---
        const time = new Date();
        let tim = time.toDateString();

        ///========== ---Today ---
        fetch('/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ City: sech })
            })
            .then(res => res.json())
            .then(data => {
                if (data !== false) {
                    nmae_cy.innerHTML = data.name;
                    time_t.innerHTML = `(${tim})`;
                    icon_wa.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
                    temp_c.innerHTML = `Temperature: ${Math.round(data.main.temp-273)} &deg;C`;
                    Hum_abr.innerHTML = `Humidity: ${data.main.humidity} %`;
                    speed_h.innerHTML = `Wind Speed:${data.wind.speed} M/S`;
                    brbr.innerHTML = '<hr class="my-4"><br/><h3>5-Day Forecast:</h3>';

                } else {
                    alert(`Not Fund City (${sech})`);

                }
            });





        ///========== ---UV_index ---
        fetch('/UV', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ City: sech })
            })
            .then(res => res.json())
            .then(data => {
                if (data !== false) {
                    ///======  ----UV Index Coler!!----
                    if (data.value <= 2) {
                        UV_i.innerHTML = ` UV index:<samp id="UV_in" class="alert alert-success">${data.value}</samp> `;
                    } else if (data.value > 2 && data.value < 8) {
                        UV_i.innerHTML = ` UV index:<samp id="UV_in" class="alert alert-warning">${data.value}</samp> `;
                    } else if (data.value >= 8) {
                        UV_i.innerHTML = ` UV index:<samp id="UV_in" class="alert alert-danger">${data.value}</samp> `;
                    }
                } else {}
            });





        ///========== ---5 Day--- 
        fetch('/5_Day', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ City: sech })
            })
            .then(res => res.json())
            .then(data => {
                let inner = '';
                if (data !== false) {
                    data.list.forEach((A, B) => {
                        if (B == 6 || B == 13 || B == 21 || B == 29 || B == 37) {
                            inner += `
                    <div class="col-sm-2">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${A.dt_txt.slice(0,11)}
                                </h5>
                                <p class="card-text">
                                <img src="http://openweathermap.org/img/wn/${A.weather[0].icon}@2x.png">
                                </p>
                                <p class="card-text">Temperature:
                                   ${Math.round(A.main.temp-273)}&deg;C
                                </p>
                                <p class="card-text"> Humidity:
                                    ${A.main.humidity}
                                    </p>
                            </div>
                        </div>
                    </div>
                        `;
                        }
                        Day_5.innerHTML = inner;
                    })
                } else {}
            });

        ///=====     ----Alarm For Error Empthy----
        let audio = new Audio("/Audio/Fresh.mp3");
        audio.play();
    }

};