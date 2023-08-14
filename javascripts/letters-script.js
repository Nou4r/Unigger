import { Letters } from "./letters.js";

for (const prop in Letters) {
    let i = 0;
    let tbody = createTable(document.querySelector("main"), prop, prop);
    for (const letter of Letters[prop]) {
        i++;
        addValueToTable(tbody, i, letter);
    }
}

/**
 * ### Adds value to table
 * @param {HTMLTableElement} $el
 * @param {Number} number
 * @param {{ original: string, modified: string, block: string }} value
 */
function addValueToTable($el, number, value) {
    const wrapper = document.createElement("tr");
    const num = document.createElement("th");
    const latin = document.createElement("td");
    const modified = document.createElement("td");
    const blocked = document.createElement("td");

    num.appendChild(document.createTextNode(number));
    latin.appendChild(document.createTextNode(value.original));
    modified.appendChild(document.createTextNode(value.modified));
    blocked.appendChild(document.createTextNode(value.block));

    wrapper.appendChild(num);
    wrapper.appendChild(latin);
    wrapper.appendChild(modified);
    wrapper.appendChild(blocked);

    $el.appendChild(wrapper);
}

/**
 * Creates a new table and appends it to $el
 * @param {HTMLElement} $el
 * @param {string} title
 * @param {string} body_id
 */
function createTable($el, title, body_id) {
    const wrapper = document.createElement("div");
    const title_ = document.createElement("h3");
    const table = document.createElement("table");

    const thead = document.createElement("thead");

    const tr = document.createElement("tr");

    const index = document.createElement("th");
    const original = document.createElement("th");
    const replacement = document.createElement("th");
    const block = document.createElement("th");

    const tbody = document.createElement("tbody");

    const tfoot = document.createElement("tfoot");

    index.appendChild(document.createTextNode("#"));
    original.appendChild(document.createTextNode("Original"));
    replacement.appendChild(document.createTextNode("Replacement"));
    block.appendChild(document.createTextNode("Block"));

    tr.appendChild(index);
    tr.appendChild(original);
    tr.appendChild(replacement);
    tr.appendChild(block);

    thead.appendChild(tr);
    tbody.id = body_id;

    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);

    title_.appendChild(document.createTextNode(title));
    title_.classList.add("letter-table-title");

    wrapper.appendChild(title_);
    wrapper.appendChild(table);

    $el.appendChild(wrapper);

    return tbody;
}
