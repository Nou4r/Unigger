import { Letters as letters } from "./letters.js";

// const Letters = letters.filter((l) => l.modified.length !== 0);

const Letters = Object.fromEntries(
    Object.entries(letters).map(([prop, arr]) => [
        prop,
        arr.filter((l) => l.modified.length !== 0),
    ])
);

const inputContainer = document.getElementById("input-container");
const inputTextarea = document.getElementById("text-input");

const outputContainer = document.getElementById("output-container");
const outputTextarea = document.getElementById("text-output");
const convertButton = document.getElementById("convert");
const replacedTable = document.getElementById("replaced-letter-table");
const inspectButton = document.getElementById("inspect");
const urlInputText = document.getElementById("text-url");
const urlCopyButton = document.getElementById("url-copy");

const toggleLowercase = document.getElementById("converter-setting-lowercase");
const toggleUppercase = document.getElementById("converter-setting-uppercase");
const toggleNumber = document.getElementById("converter-setting-number");
const toggleSymbol = document.getElementById("converter-setting-symbol");

// Remember converter state
[toggleLowercase, toggleUppercase, toggleNumber, toggleSymbol].forEach(($el) =>
    loadToggleState($el)
);

const params = new URLSearchParams(window.location.search);
let inputParam = params.get("input");

if (inputParam) convert(inputParam);

document.addEventListener("DOMContentLoaded", () => {
    urlCopyButton.innerText = urlCopyButton.dataset["unclicked"];
    convertButton.addEventListener("click", () => convert());
    var clipboard = new ClipboardJS("#url-copy");

    // Remember converter state
    [toggleLowercase, toggleUppercase, toggleNumber, toggleSymbol].forEach(
        ($el) => $el.addEventListener("change", (e) => setToggleState(e))
    );

    clipboard.on("success", (e) => {
        urlCopyButton.innerText = urlCopyButton.dataset["clicked"];
        setTimeout(() => {
            urlCopyButton.innerText = urlCopyButton.dataset["unclicked"];
        }, 1500);
        e.clearSelection();
    });

    clipboard.on("error", (e) => {
        alert(
            "There was an error trying to copy to clipboard. Please check console for more info"
        );
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
    });
});

function loadToggleState($el) {
    let state = false;
    if (localStorage.getItem($el.dataset["target"]) == "true") state = true;
    $el.checked = state;
}

function setToggleState(e) {
    localStorage.setItem(e.target.dataset["target"], e.target.checked);
}

/**
 * ### Copies content of input element to clipboard
 * @param {HTMLInputElement} input Input element
 */
function copyToClipboard(input) {
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
}

/**
 * ### Converts
 * @param {string|undefined} inputValue
 */
function convert(inputValue = undefined) {
    let value = "";

    clearNotifications();

    if (inputValue) {
        inputTextarea.value = inputValue;
        value = inputValue;
    } else if (inputTextarea.value.length) {
        value = inputTextarea.value;
    } else {
        showInputNotification("Input cannot be empty");
        return;
    }

    replacedTable.innerHTML = "";

    // List of letter that will replace original
    let replaceLetters = [];

    // If uppercase checkbox is checked, append item in Letters.uppercase to replaceLetters
    if (toggleUppercase.checked)
        replaceLetters = replaceLetters.concat(Letters.uppercase);

    // same thing as uppercase
    if (toggleLowercase.checked)
        replaceLetters = replaceLetters.concat(Letters.lowercase);

    // same thing as uppercase
    if (toggleNumber.checked)
        replaceLetters = replaceLetters.concat(Letters.number);

    // same thing as uppercase
    if (toggleSymbol.checked)
        replaceLetters = replaceLetters.concat(Letters.symbol);

    let i = 0;
    for (const letter of replaceLetters) {
        if (value.includes(letter.original)) {
            i++;
            value = value.replace(letter.original, letter.modified);
            addValueToTable(replacedTable, {
                n: i,
                o: letter.original,
                m: letter.modified,
                b: letter.block,
            });
        } else continue;
    }

    outputTextarea.value = value;
    inspectButton.href = `https://apps.timwhitlock.info/unicode/inspect?s=${encodeURI(
        value
    )}`;
    urlInputText.value = `${window.location}?input=${encodeURI(
        inputTextarea.value
    )}`;

    if (!outputContainer.classList.contains("is-active")) {
        outputContainer.classList.add("is-active");
    }

    if (i === 0) {
        showOutputNotification("No letter were replaced");
    }
}

function clearNotifications() {
    const notifications = document.querySelectorAll(".notification");

    if (notifications) {
        notifications.forEach((el) => el.remove());
    }
}

function showInputNotification(message) {
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-circle-xmark fa-lg");
    icon.style.setProperty("margin-right", "0.35rem");

    const icon_container = document.createElement("span");
    icon_container.setAttribute("class", "icon-container");
    icon_container.appendChild(icon);

    const text = document.createElement("p");
    text.appendChild(document.createTextNode(message));

    const notification = document.createElement("div");
    notification.setAttribute("class", "notification is-danger");
    notification.appendChild(icon_container);
    notification.appendChild(text);
    inputContainer.insertBefore(notification, inputTextarea);
    if (outputContainer.classList.contains("is-active")) {
        outputContainer.classList.remove("is-active");
    }
}

function showOutputNotification(message) {
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-circle-xmark fa-lg");
    icon.style.setProperty("margin-right", "0.35rem");

    const icon_container = document.createElement("span");
    icon_container.setAttribute("class", "icon-container");
    icon_container.appendChild(icon);

    const text = document.createElement("p");
    text.appendChild(document.createTextNode(message));

    const notification = document.createElement("div");
    notification.setAttribute("class", "notification is-danger");
    notification.appendChild(icon_container);
    notification.appendChild(text);
    outputContainer.insertBefore(notification, outputTextarea);
}

/**
 * ### Adds value to table
 * @param {HTMLTableElement} $el
 * @param {{ n:number, o: string, m: string, b: string }} value
 */
function addValueToTable($el, value) {
    const wrapper = document.createElement("tr");
    const num = document.createElement("th");
    const latin = document.createElement("td");
    const modified = document.createElement("td");
    const blocked = document.createElement("td");

    num.appendChild(document.createTextNode(value.n));
    latin.appendChild(document.createTextNode(value.o));
    modified.appendChild(document.createTextNode(value.m));
    blocked.appendChild(document.createTextNode(value.b));

    wrapper.appendChild(num);
    wrapper.appendChild(latin);
    wrapper.appendChild(modified);
    wrapper.appendChild(blocked);

    $el.appendChild(wrapper);
}

/**
 * ### Gets the amount of childern in an element
 * @param {HTMLElement} parent Parent element
 * @param {boolean} getChildrensChildren Get all child node?
 * @returns
 */
function getChildernCount(parent, getChildrensChildren) {
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for (var i = 0; i < children; i++) {
        if (parent.childNodes[i].nodeType != 3) {
            if (getChildrensChildren)
                relevantChildren += getChildernCount(
                    parent.childNodes[i],
                    true
                );
            relevantChildren++;
        }
    }
    return relevantChildren;
}

/**
 * ### Display a toast message
 * @param {string} message - Message to display
 * @param {number|undefined} duration - Toast show duration in ms (default: 3000)
 * @param {HTMLElement|undefined} prefixElement - Element to display before message (for example font awesome)
 */
export function ShowToast(message, duration, prefixElement) {
    const toastElement = document.createElement("div");

    toastElement.setAttribute("class", "toast");
    if (prefixElement) {
        prefixElement.style.setProperty("margin-right", "0.5rem");
        toastElement.appendChild(prefixElement);
    }
    toastElement.appendChild(document.createTextNode(message));
    document.body.appendChild(toastElement);
    toastElement.classList.toggle("show");
    setTimeout(() => {
        toastElement.classList.toggle("show");
        setTimeout(() => {
            document.body.removeChild(toastElement);
        }, 100);
    }, duration ?? 3000);
}
