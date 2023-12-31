flatpickr("#dueDate", {
    dateFormat: 'd/m/Y H:i',
    enableTime: true,
    time_24hr: true
});

let tasks = [];
let editId;

if (localStorage.getItem('tasksi')) {
    tasks = JSON.parse(localStorage.getItem('tasksi'));
};

function reloadTasks() {
    document.getElementById('tasksi').innerHTML = '';

    let count = 0;
    for (task of tasks) {
/*         console.log(task)
 */        let isDone = ''
        if (task.isDone === true) {
            isDone = 'done';
        }
        document.getElementById('tasksi').innerHTML += `
    <tr class=${isDone}>
        <th scope="row">${count + 1}</th>
        <td>${task.title}</td>
        <td>${task.due}</td>
        <td>${task.status}</td>
        <td>
                <button type="button" class="btn btn-danger btn-delete "data-id=${count}>Delete</button>
                <button type="button" class="btn btn-light ms-1 btn-done "data-id=${count}>Done</button>
                <button type="button" class="btn btn btn-light ms-1 btn-restore "data-id=${count}>Restore</button>
                <button type="button" class="btn btn btn-info ms-1 btn-edit "data-id=${count}>Edit</button>
                <button type="button" class="btn btn btn-info ms-1 btn-save "data-id=${count}>Save</button>
            </td>
    </tr>
    `
        count++
    }
    localStorage.setItem('tasksi', JSON.stringify(tasks))
};

document.getElementById('addTodo').addEventListener('click', function () {
    tasks.push({
        title: document.getElementById('writeTodo').value,
        due: document.getElementById('dueDate').value,
        status: 'In progress'
    });
    document.getElementById('cancel').click();
    reloadTasks()
});

document.getElementById('cancel').addEventListener('click', function () {
    document.getElementById('writeTodo').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('form').classList.remove('onEdit')
});

document.getElementById('save').addEventListener('click', function () {
    const editTitle = document.getElementById('writeTodo').value
    const editDue = document.getElementById('dueDate').value
    tasks[editId].title = editTitle;
    tasks[editId].due = editDue;
    document.getElementById('cancel').click();
    reloadTasks()
});


document.getElementById('tasksi').addEventListener('click', function (event) {

    let myId;
    if (event.target.getAttribute('data-id')) {
        myId = event.target.getAttribute('data-id')
        console.log(myId)
    }

    if (event.target.classList.contains('btn-delete')) {
        tasks.splice(myId, 1);
    }

    if (event.target.classList.contains('btn-done')) {
        tasks[myId].status = 'Done';
        tasks[myId].isDone = true;
    }

    if (event.target.classList.contains('btn-restore')) {
        tasks[myId].status = 'In progress';
        tasks[myId].isDone = false;
    }

    if (event.target.classList.contains('btn-edit')) {
        document.getElementById('writeTodo').value = tasks[myId].title;
        document.getElementById('dueDate').value = tasks[myId].due;
        document.getElementById('form').classList.add('onEdit');
        editId = myId;
    }

    reloadTasks()
    console.log(tasks)

});
reloadTasks()
console.log(tasks)


