(function($) {
    'use strict';

    // let task = getData();
    // tasks.forEach((task) => {
    //     createTask('#todos', {
    //         text : task.test,
    //         id   : task.text
    //     });
    // })

    // console.log(getData());
    // console.log(typeof getData());

    $(getData()).each((index, task) => {
        console.log(task);
        createTask('#todos', {
            text : task.text,
            id   : task.id
        });
    });

    $('#textInput').on('input', () => {
        if ($('#textInput').val().length) {
            $('#createBtn').removeAttr('disabled');
        } else {
            $('#createBtn').attr('disabled', true);
        }
    });

    $('#form').on('submit', (e) => {
        e.preventDefault();

        createTask('#todos', {
            id: null,
            text: $('#textInput').val()
        });

        $('#textInput').val('');
        $('#createBtn').attr('disabled', true);
    });

    function createTask(target, task) {

        

        let now   = new Date();
        let isNew = task.id ? false : true;
        task.id   = task.id ? task.id : now.getTime();
        let html = `<li class="list-group-item">${task.text}</li>`;

       // if (!task.id) {


            if (target == '#todos') {
                html = `
                <li class="list-group-item">
                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input" id="${task.id}">
                        <label class="form-check-label" for="${task.id}">${task.text}</label>
                    </div>
                    <input type="text" class="form-control mb-2" value="${task.text}" style="display: none;">
                    <button class="btn btn-sm btn-warning editBtn" type="button">Редактировать</button>
                    <button class="btn btn-sm btn-danger deleteBtn" type="button">Удалить</button>
                    <button class="btn btn-sm btn-success saveBtn" style="display: none;" type="button">Сохранить</button>
                    <button class="btn btn-sm btn-secondary cancelBtn" style="display: none;" type="button">Отменить</button>
                    <button class="btn btn-sm btn-success getBackBtn" style="display: none;" type="button">Восстановить</button>
                </li>   
                `;
                if (isNew) {
                    let tasks = getData();
                    tasks.push({ id : task.id, text : task.text});
                    saveData(tasks);
                }
            }

        $(target).append(html);
    }

    function removeTask(target) {

        let id = target.find('[type="checkbox"]').attr('id'),
            tasks = getData(),
            index = -1;

        $(tasks).each((i, task) => {
            if (task.id == id) {
                index = i;
            }
        });

        tasks.splice(index, 1);

        saveData(tasks);

        target.remove();
    }

    function saveTask(target) {

        makeReadMode(target);

        let text = $(target).find('.form-control').val();
        let id   = $(target).find('.form-check-input').attr('id');

        $(target).find('label').text(text);

        let tasks = getData();

        $(tasks).each((index, task) => {
            if (id == task.id) {
                task.text = text;
                return false;
            }
        })

        saveData(tasks);
    }

    function rebootTask(target) {
        makeReadMode(targert);

        $(target)
            .find('.form-control')
            .val($(target).find('label').text());
    }

    $('body').on('change', 'input[type="checkbox"]', function() {

        createTask('#completed', {
            id : null,
            text : $(this).next().text()
        })

        removeTask($(this).parents('li'));
    })

    $('body').on('click', '.deleteBtn', function() {
        removeTask($(this).parents('li'));
    })

    $('body').on('click', '.editBtn', function() {
        let parent = $(this).parents('li');
        
        makeEditMode(parent);
    })

    $('body').on('click', '.cancelBtn', function() {
        rebootTask($(this).parents('li'));
    })

    $('body').on('keydown', '.form-control', function(e) {
        if (e.keyCode == 27) {
            saveTask($(this).parents('li'));
        }
    })

    $('body').on('keydown', '.form-control', function(e) {
        if (e.keyCode == 13) {
            saveTask($(this).parents('li'));
        }
    })

    $('body').on('click', '.saveBtn', function() {
        saveTask($(this).parents('li'));
    })

    function makeReadMode(parent) {
        $(parent)
            .find('.saveBtn, .cancelBtn, .form-control')
            .hide();

        $(parent)
            .find('.editBtn, .deleteBtn, .form-check')
            .fadeIn(500);
    }

    function makeEditMode(parent) {
        $(parent)
        .find('.editBtn, .deleteBtn, .form-check')
        .hide();
        $(parent)
        .find('.saveBtn, .cancelBtn, .form-control')
        .show();
    }

    function saveData(data) {
        localStorage.setItem('tasks', JSON.stringify(data));
    }

    function getData() {
        var data = localStorage.getItem('tasks');
        return  data = data ? JSON.parse(data) : [];
    }

})(jQuery);