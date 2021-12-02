const file = 'data.csv';
const character_headers = ['adjective', 'race', 'character_class', 'origin', 'who'];
const item_headers = ['sentimental_magic_item_d100', 'magical_item'];
const setting_headers = ['atmosphere', 'primary', 'secondary', 'ground', 'water'];

var csv_data = {};


function load_file(callback) {
    var reader = new XMLHttpRequest();

    reader.onreadystatechange = function () {
        if (reader.readyState === 4 && reader.status === 200 && callback) callback(reader.responseText);
    }
    reader.open('get', file, true);
    reader.send();
}


function csv_parser(raw_csv_data) {
    let rows = $.csv.toArrays(raw_csv_data);
    let headers = rows[0];

    for (let h = 0; h < headers.length; h++) {
        let header = headers[h].replace(/\s/gi, '_').toLowerCase();
        csv_data[header] = [];

        for (let r = 1; r < rows.length; r++) {
            let row_data = rows[r];
            if (row_data[h] != undefined && row_data[h] != '') {
                csv_data[header].push(row_data[h].toLowerCase());
            }
        }
    }
}


function get_attributes(headers) {
    let attr_data = {};
    for (let h = 0; h < headers.length; h++) {
        let header = headers[h].toLowerCase();
        let values = csv_data[header];
        let rand = Math.floor(Math.random() * (values.length - 0) + 0);
        let rand_value = values[rand];
        attr_data[header] = rand_value;
    }
    return attr_data
}


function create_character() {
    let determiner = 'a'
    let character_data = get_attributes(character_headers);
    let output = `<p>You are ${determiner} <span id="adjective">${character_data.adjective}</span> <span id="race">${to_title_case(character_data.race)}</span> <span id="character_class">${to_title_case(character_data.character_class)}</span> from <span id="origin"><span id="origin">${character_data.origin}</span> who <span id="who">${character_data.who}</span>.</p>`;
    document.getElementById("printer").innerHTML = output;
}


function create_items() {
    let item_data = get_attributes(item_headers);
    let output = `<p>You have <span id="sentimental_magic_item_d100">${item_data['sentimental_magic_item_d100']}</span><br /><br />and<br /><br /><span id="magical_item">${item_data['magical_item']}</span></p>`;
    document.getElementById("printer").innerHTML = output;
}


function create_setting() {
    let setting_data = get_attributes(setting_headers);
    let output = `<p>You are in a <span id="atmosphere">${setting_data.atmosphere}</span> place with <span id="primary">${setting_data.primary}</span> and <span id="secondary">${setting_data.secondary}</span>.</p>`;
    document.getElementById("printer").innerHTML = output;
}


function to_title_case(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


$('document').ready(load_file(csv_parser));
