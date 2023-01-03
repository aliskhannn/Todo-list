// Находим элементы на странице
const taskInput = document.querySelector('#task-input'),
	form = document.querySelector('#form'),
	myDay = document.querySelector('#my-day'),
	completed = document.querySelector('#completed'),
	deleted = document.querySelector('#deleted'),
	important = document.querySelector('#important'),
	emptyList = document.querySelectorAll('.tasks-empty'),
	tabsBtn = document.querySelectorAll('.tabs-item'),
	taskItem = document.querySelectorAll('.task-block');

// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
myDay.addEventListener('click', deleteTask);
important.addEventListener('click', deleteTask);

// Восстановление задачи
deleted.addEventListener('click', restoreTask);

// Отмечаем задачу как выполненную 
myDay.addEventListener('click', completeTask);
important.addEventListener('click', completeTask);

// Отмечаем задачу как важную
myDay.addEventListener('click', markAsImporatant);

// Убираем задачу из списка важных
important.addEventListener('click', unMarkAsImporatant);

// Переклюяение между пунктами меню/Отображение выполненных, удаленных, важных задач
tabsBtn.forEach(elem => {
	elem.addEventListener('click', function () {
		let currentBtn = elem;
		let tabsId = currentBtn.getAttribute('data-tab');
		let currentTab = document.querySelector(`#${tabsId}`);
		// let currentTabId = currentTab.getAttribute('data-text');
		// let currentTabText = document.querySelector(`#${currentTabId}`);

		if (!currentBtn.classList.contains('_active')) {
			tabsBtn.forEach(elem => {
				elem.classList.remove('_active');
			});

			taskItem.forEach(block => {
				block.classList.remove('_show');
			});

			currentBtn.classList.add('_active');
			currentTab.classList.add('_show');
		}

		// if(currentTab.children.length > 1) {
		// 	currentTabText.classList.add('none');
		// }

		// console.log(currentTab.children.length);
		// console.log(currentTabText);
	});
});

document.querySelector('.tabs-item').click();

// Функции
function addTask(event) {
	let newTask = '';

	// Отмена отправки формы
	event.preventDefault();

	// Если поле ввода пусто, выходим из функции
	if (!taskInput.value) return;

	// Разметка для новой задачи
	newTask = `
		<div class="tasks-item">
			<p class="tasks-text">${taskInput.value}</p>
			<div class="tasks-control">
				<span data-action="favorite" class="control-icon material-symbols-outlined">
					star
				</span>
				<span data-action="done" class="control-icon material-symbols-outlined">
					done
				</span>
				<span data-action="delete" class="control-icon material-symbols-outlined">
					delete
				</span>
				<span data-action="restore" class="control-icon material-symbols-outlined">
					restore_from_trash
				</span>
			</div>
		</div>
	`;

	// Добавлям задачу на страницу
	myDay.insertAdjacentHTML('beforeend', newTask);

	// Очищаем поле ввода и добавляем на него фокус
	taskInput.value = '';
	taskInput.focus();
	showAndHideText();
}

function deleteTask(event) {
	// Проверка клика по кнопке "удалить задачу"
	if (event.target.dataset.action === 'delete') {
		const parentNode = event.target.closest('.tasks-item');
		const parentNodeContent = parentNode.outerHTML;
		deleted.insertAdjacentHTML("beforeend", parentNodeContent);
		parentNode.remove();
	}

	// Если список пуст, отображаем текст "To-list is empty"
	showAndHideText();
}

function restoreTask(event) {
	// Проверка клика по кнопке "восстановить задачу"
	if (event.target.dataset.action === 'restore') {
		const parentNode = event.target.closest('.tasks-item');
		const parentNodeContent = parentNode.outerHTML;
		myDay.insertAdjacentHTML("beforeend", parentNodeContent);
		parentNode.remove();
	}

	// Если список пуст, отображаем текст "To-list is empty"
	showAndHideText();
}

function completeTask(event) {
	// Проверка клика по кнопке "отметить как выполненное"
	if (event.target.dataset.action === 'done') {
		const parentNode = event.target.closest('.tasks-item');
		const parentNodeContent = parentNode.outerHTML;
		completed.insertAdjacentHTML('beforeend', parentNodeContent);
		parentNode.remove();
	}
	showAndHideText();
}

function markAsImporatant(event) {
	// Проверка клика по кнопке "отметить как важное"
	if (event.target.dataset.action === 'favorite') {
		const parentNode = event.target.closest('.tasks-item');
		const parentNodeContent = parentNode.outerHTML;
		important.insertAdjacentHTML('beforeend', parentNodeContent);
		parentNode.remove();
	}

	showAndHideText();
}

function unMarkAsImporatant(event) {
	// Повторная проверка клика по кнопке "отметить как выполненное" для выполнения альтернативного действия
	if (event.target.dataset.action === 'favorite') {
		const parentNode = event.target.closest('.tasks-item');
		const parentNodeContent = parentNode.outerHTML;
		myDay.insertAdjacentHTML('beforeend', parentNodeContent);
		parentNode.remove();
	}
	showAndHideText();
}

// Функция скрытия и показа текста "Список дел пуст" по мере добавления/удаления задач
function showAndHideText() {
	taskItem.forEach(item => {
		let currentTabId = item.getAttribute('data-text');
		let currentTabText = document.querySelector(`#${currentTabId}`);

		if(item.children.length > 1) {
			currentTabText.classList.add('none');
		} else if(item.children.length === 1) {
			currentTabText.classList.remove('none');
		}
	});
}