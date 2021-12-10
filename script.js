/**
 Random D&D Generator Script
 */

//Data file path (relative).
const file = "data.csv";

// Headers.
const character_headers = ["adjective", "race", "character_class", "origin", "who"];
const item_headers = ["sentimental_magic_item_d100", "magical_item"];
const setting_headers = ["atmosphere", "place", "primary", "secondary"];
const villain_headers = ["villain_trait"];
const game_starts_headers = ["game_starts"];
const twist_headers = ["twist"];

// Global csv data dictionary.
var csv_data = {};


function init() {
    /**
     * Initialize the document.
     */
    load_file(csv_parser);
}


function load_file(callback) {
    /**
     * Load the csv file and run the callback function.
     */
    var reader = new XMLHttpRequest();

    // Async file reader.
    reader.onreadystatechange = function () {
        if (reader.readyState === 4 && reader.status === 200 && callback) callback(reader.responseText);
    }
    reader.open("get", file, true);
    reader.send();
}


function csv_parser(raw_csv_data) {
    /**
     * Take the raw csv data and convert it to a dictionary.
     */
    // Use jquery-csv to convert the raw csv data to a 2D array.
    let rows = $.csv.toArrays(raw_csv_data);
    let headers = rows[0];

    // Convert the 2D array to a dictionary of header: [col1, col2, ...]
    // essentially, converting the rows to columns.
    for (let h = 0; h < headers.length; h++) {
        let header = headers[h].replace(/\s/gi, "_").toLowerCase();
        csv_data[header] = [];

        for (let r = 1; r < rows.length; r++) {
            let row_data = rows[r];
            if (row_data[h] != undefined && row_data[h] != "") {
                csv_data[header].push(row_data[h]);
            }
        }
    }
}


function get_attributes(headers) {
    /**
     * Pick a random value from the csv dictionary for each given header.
     */
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
    /**
     * Fill in the character data, show the character fields and hide
     * everything else/
     */
    let determiner = "a"
    document.getElementById("determiner").textContent = determiner;

    let character_data = get_attributes(character_headers);
    for (let h = 0; h < character_headers.length; h++) {
        let header = character_headers[h]
        document.getElementById(header).textContent = character_data[header];
    }
    $("#character_field").show();
    $("#items_field").hide();
    $("#setting_field").hide();
    $("#villain_field").hide();
    $("#game_starts_field").hide();
    $("#twist_field").hide();
}


function create_items() {
    /**
     * Fill in the item data, show the item fields and hide
     * everything else/
     */
    let item_data = get_attributes(item_headers);
    for (let h = 0; h < item_headers.length; h++) {
        let header = item_headers[h]
        document.getElementById(header).textContent = item_data[header];
    }
    $("#character_field").hide();
    $("#items_field").show();
    $("#setting_field").hide();
    $("#villain_field").hide();
    $("#game_starts_field").hide();
    $("#twist_field").hide();
}


function create_setting() {
    /**
     * Fill in the setting data, show the setting fields and hide
     * everything else/
     */
    let setting_data = get_attributes(setting_headers);
    for (let h = 0; h < setting_headers.length; h++) {
        let header = setting_headers[h]
        document.getElementById(header).textContent = setting_data[header];
    }
    $("#character_field").hide();
    $("#items_field").hide();
    $("#setting_field").show();
    $("#villain_field").hide();
    $("#game_starts_field").hide();
    $("#twist_field").hide();
}


function create_villain() {
    /**
     * Fill in the villain data, show the villain fields and hide
     * everything else/
     */
    let villain_data = get_attributes(villain_headers);
    for (let h = 0; h < villain_headers.length; h++) {
        let header = villain_headers[h]
        document.getElementById(header).textContent = villain_data[header];
    }
    $("#character_field").hide();
    $("#items_field").hide();
    $("#setting_field").hide();
    $("#villain_field").show();
    $("#game_starts_field").hide();
    $("#twist_field").hide();
}


function create_game_starts() {
    /**
     * Fill in the game starts data, show the game starts fields and hide
     * everything else/
     */
    let game_starts_data = get_attributes(game_starts_headers);
    for (let h = 0; h < game_starts_headers.length; h++) {
        let header = game_starts_headers[h]
        document.getElementById(header).textContent = game_starts_data[header];
    }
    $("#character_field").hide();
    $("#items_field").hide();
    $("#setting_field").hide();
    $("#villain_field").hide();
    $("#game_starts_field").show();
    $("#twist_field").hide();
}


function create_twist() {
    /**
     * Fill in the twist data, show the twist fields and hide
     * everything else/
     */
    let twist_data = get_attributes(twist_headers);
    for (let h = 0; h < twist_headers.length; h++) {
        let header = twist_headers[h]
        document.getElementById(header).textContent = twist_data[header];
    }
    $("#character_field").hide();
    $("#items_field").hide();
    $("#setting_field").hide();
    $("#villain_field").hide();
    $("#game_starts_field").hide();
    $("#twist_field").show();
}


function to_title_case(str) {
    /**
     * Convert a string to title case.
     */
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


$("document").ready(init());
