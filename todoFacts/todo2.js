let taskim = [];

if (localStorage.getItem('todoList')) {
    taskim = JSON.parse(localStorage.getItem('todoList'));
}

function reloadItems() {
    $('#tasksTbl').html('');

    taskim.forEach((taskim, index) => {
        $('#tasksTbl').append(`
                <tr class=${taskim.isDone}>
                    <th>${index + 1}</th>
                    <td>${taskim.title}
                        <div class="widget-subheading">
                            ${taskim.name}
                        </div>
                    </td>
                    <td>
                        ${taskim.due}
                    </td>
                    <td>
                        <div class="widget-content-right">
                            <button type='button' data-id='${index}'class="border-0 btn-transition btn btn-outline-success done-btn">
                                <i class="fa fa-check"></i>
                            </button>
                            <button type='button' data-id='${index}' class="border-0 btn-transition btn restore-btn">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                            <button type='button' data-id='${index}' class="border-0 btn-transition btn btn-outline-danger delete-btn">
                                <i class="fa fa-trash"></i>
                            </button>
                            <button type='button' data-id='${index}' class="border-0 btn-transition btn btn-outline-dark edit-btn">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                    </td>
                </tr>
        `)
    });
    localStorage.setItem('todoList', JSON.stringify(taskim));
}

function emptyInputs() {
    $('#taskInpt').val(''),
        $('#nameInpt').val(''),
        $('#dateInpt').val('')
}

$('#addBtn').on('click', function () {
    taskim.push({
        title: $('#taskInpt').val(),
        name: $('#nameInpt').val(),
        due: $('#dateInpt').val(),
        isDone: 'notDone'
    });
    reloadItems();
    emptyInputs();
});

$('#saveBtn').on('click', () => {
    const editedTitle = $('#taskInpt').val();
    const editedName = $('#nameInpt').val();
    const editedDue = $('#dateInpt').val();
    const editeId = $('#editId').val()

    taskim[editeId].title = editedTitle;
    taskim[editeId].name = editedName;
    taskim[editeId].due = editedDue;

    reloadItems();
    emptyInputs();
});

$('#tasksTbl').on('click', '.delete-btn', function () {
    const arrId = $(this).data('id');
    taskim.splice(arrId, 1);
    localStorage.setItem('todoList', JSON.stringify(taskim));
    reloadItems();
});

$('#tasksTbl').on('click', '.done-btn', function () {
    const arrId = $(this).attr('data-id')
    taskim[arrId].isDone = 'done';
    localStorage.setItem('todoList', JSON.stringify(taskim));
    reloadItems();
});

$('#tasksTbl').on('click', '.restore-btn', function () {
    const arrId = $(this).attr('data-id');
    taskim[arrId].isDone = 'notDone';
    localStorage.setItem('todoList', JSON.stringify(taskim));
    reloadItems();
});

$('#tasksTbl').on('click', '.edit-btn', function () {
    const arrId = $(this).attr('data-id');
    $('#taskInpt').val(taskim[arrId].title);
    $('#nameInpt').val(taskim[arrId].name);
    $('#dateInpt').val(taskim[arrId].due);
    $('#editId').val(arrId);
    $('#saveBtn').addClass('saveEdit');
    $('#addBtn').addClass('saveEdit');
});

$('#rndFact').on('click', function () {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/facts?limit=1',
        headers: { 'X-Api-Key': 'W1WWbge47bUsFloOU58lIA==RcwmxnPgUHrV3UEk' },
        contentType: 'application/json',
        success: function (facts) {
            console.log(facts)
            facts.forEach((fact) => {
                $('#rndFactDiv').html(`${fact.fact}`)
            });
        },
    });
});

reloadItems();
