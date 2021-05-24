//VARIABLES
let selected_genre;
var user_selection_input = document.getElementById("selction_name");
const api_key = '06fee10b016f04991aaa3bf31b7e9a0b';
var output_div = document.getElementById("output");

//EVENT HADNLERS
document.getElementById("select_genre").addEventListener("change", update_genre);
document.getElementById("search_request").addEventListener("click", fetchData);


function update_genre() {
    selected_genre = document.getElementById("select_genre").value;

    updating_input_placeholder();
}

function updating_input_placeholder() {
    if (selected_genre == "Tv") {
        user_selection_input.placeholder = `Enter name of ${selected_genre} show`;
    } else {
        user_selection_input.placeholder = `Enter name of ${selected_genre}`;
    }
}


async function fetchData() {
    selected_genre = document.getElementById("select_genre").value;
    const api_url = `https://api.themoviedb.org/3/search/${selected_genre.toLowerCase()}?api_key=${api_key}&query=${user_selection_input.value.toLowerCase()}`
    const response = await fetch(api_url);
    const data = await response.json();

    cleanData(data);
}

function cleanData(data) {

    selected_genre = document.getElementById("select_genre").value;

    let title;
    var rating = data.results[0].vote_average;;
    var poster_path = data.results[0].poster_path;;
    var description = data.results[0].overview;

    if (selected_genre == "Tv") title = data.results[0].name;
    else title = data.results[0].title;


    delete_previous_generations();
    display_fetched_data(title, rating, description, poster_path);
}

function display_fetched_data(title, rating, description, poster_path) {

    const img_url = 'https://image.tmdb.org/t/p/w500';

    var poster = document.createElement('img');
    poster.src = `${img_url}${poster_path}`;
    output_div.appendChild(poster);

    var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < 2; j++) {
            var td = document.createElement('td');

            if (i == 0 && j == 0) {
                td.textContent = 'Title';
            } else if (i == 0 && j == 1) {
                td.textContent = title;
            } else if (i == 1 && j == 0) {
                td.textContent = 'Description'
            } else if (i == 1 && j == 1) {
                td.textContent = description;
            } else if (i == 2 && j == 0) {
                td.textContent = 'Rating';
            } else {
                td.textContent = `${rating}/10`;
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    output_div.appendChild(table);

}



function delete_previous_generations() {
    try {
        output_div.innerHTML = '';
    } catch {
        console.log("");
    }
}