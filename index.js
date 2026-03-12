let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const template = document.querySelector("#to-do__item-template");

function loadTasks() {
	const savedTasks = localStorage.getItem("tasks");
	if (savedTasks) {
		return JSON.parse(savedTasks);
	}
	return items;
}

function updateTasks() {
	items = getTasksFromDOM();
	saveTasks(items);
}

function createItem(item) {
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		updateTasks();
	});

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		updateTasks();
	});

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");
		updateTasks();
	});

	return clone;
}

function getTasksFromDOM() {
	const itemTextElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemTextElements.forEach((textElement) => {
		tasks.push(textElement.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const item = inputElement.value.trim();
	if (!item) return;
	listElement.prepend(createItem(item));
	updateTasks();
	formElement.reset();
});

items = loadTasks();
items.forEach((item) => {
	listElement.append(createItem(item));
});
