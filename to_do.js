document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.createElement('div');
    newTodoInput.id = 'new-todo-input';
    newTodoInput.innerHTML = '<input type="text" placeholder="Enter new to-do...">';
    document.querySelector('.container').appendChild(newTodoInput);

    const calendarViewBtn = document.getElementById('calendar-view-btn');
    const calendarModal = document.getElementById('calendar-modal');
    const closeBtn = document.getElementById('close-btn');
    const tasksByDate = document.getElementById('tasks-by-date');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    renderTodoList();

    addBtn.addEventListener('click', () => {
        newTodoInput.style.display = 'block';
        newTodoInput.querySelector('input').focus();
    });

    newTodoInput.querySelector('input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newTodo = e.target.value.trim();
            if (newTodo) {
                const index = todos.length;
                todos.push({ text: newTodo, highlighted: false, date: null });
                localStorage.setItem('todos', JSON.stringify(todos));
                addTodoItem({ text: newTodo, highlighted: false, date: null }, index);
                e.target.value = '';
                newTodoInput.style.display = 'none';
            }
        }
    });

    function addTodoItem(todo, index) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        if (todo.highlighted) {
            todoItem.classList.add('highlighted');
        }

        const todoText = document.createElement('span');
        todoText.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodoList();
        });

        const highlightBtn = document.createElement('button');
        highlightBtn.className = 'highlight-btn';
        highlightBtn.innerHTML = '⭐';
        highlightBtn.addEventListener('click', () => {
            todo.highlighted = !todo.highlighted;
            localStorage.setItem('todos', JSON.stringify(todos));
            todoItem.classList.toggle('highlighted');
        });

        const dateBtn = document.createElement('button');
        dateBtn.className = 'date-btn';
        dateBtn.innerHTML = '📅';
        dateBtn.addEventListener('click', () => {
            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.className = 'date-input';
            dateInput.value = todo.date || '';
            dateInput.addEventListener('change', (e) => {
                todo.date = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodoList();
            });

            // Clear existing date inputs
            document.querySelectorAll('.date-input').forEach(input => input.remove());
            todoItem.appendChild(dateInput);
            dateInput.click();
        });

        todoItem.appendChild(todoText);
        todoItem.appendChild(highlightBtn);
        todoItem.appendChild(dateBtn);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
    }

    function renderTodoList() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => addTodoItem(todo, index));
    }

    calendarViewBtn.addEventListener('click', () => {
        tasksByDate.innerHTML = '';
        const tasksByDateObj = todos.reduce((acc, todo) => {
            if (todo.date) {
                if (!acc[todo.date]) {
                    acc[todo.date] = [];
                }
                acc[todo.date].push(todo);
            }
            return acc;
        }, {});

        // Sort dates
        const sortedDates = Object.keys(tasksByDateObj).sort((a, b) => new Date(a) - new Date(b));

        sortedDates.forEach(date => {
            const dateSection = document.createElement('div');
            dateSection.className = 'date-section';

            const dateHeading = document.createElement('h3');
            dateHeading.textContent = date;
            dateSection.appendChild(dateHeading);

            tasksByDateObj[date].forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.textContent = task.text;
                taskItem.addEventListener('click', () => {
                    alert(`Task: ${task.text}\nDate: ${task.date}`);
                });

                dateSection.appendChild(taskItem);
            });

            tasksByDate.appendChild(dateSection);
        });

        calendarModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        calendarModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === calendarModal) {
            calendarModal.style.display = 'none';
        }
    });

    renderTodoList();
});
