let todo = [];
const all　= document.getElementById('all');
const progress　= document.getElementById('progress');
const complete　= document.getElementById('complete');
const addbtn = document.getElementById('addbtn');
let count_remove = 0;

all.addEventListener('click', checkRadioButton, false);
progress.addEventListener('click', checkRadioButton, false);
complete.addEventListener('click', checkRadioButton, false);
addbtn.addEventListener("click", addTask, false);

function addTask(){
    const str = document.getElementById('inputtask').value;
    document.getElementById('inputtask').value = '';
    let task = {};
    task.id = todo.length + count_remove;
    task.comment = str;
    task.state = "作業中"
    todo.push(task);
    checkRadioButton();
}

function checkRadioButton(){
    let checkAll = document.radioform.all.checked;
    let checkProgress = document.radioform.progress.checked;
    let checkComplete = document.radioform.complete.checked;

    if (checkAll) {
        //console.log(todo);
        show(todo);
    }
    else if (checkProgress) {
        let filtered = todo.filter(function(todo){
        return todo.state=="作業中";
        });
        show(filtered);
    }
    else if (checkComplete) {
        let filtered = todo.filter(function(todo){
        return todo.state=="完了";
        });
        show(filtered);
    }
}

function show(todo){
    const tbody = document.getElementById('tbodyid');
    if (tbody.hasChildNodes()){
        tbody.textContent = null;
    }
    for (let i=0; i < todo.length; i++) {
        let tr = document.createElement('tr');
        let td_id = document.createElement('td');
        let td_comment = document.createElement('td');
        let td_state = document.createElement('td');
        let td_button1 = document.createElement('input');
        td_button1.type = "button";
        td_button1.value = todo[i].state;
        td_button1.name = "state";
        td_button1.id = todo[i].id;;
        let td_button2 = document.createElement('input');
        td_button2.type = "button";
        td_button2.value = "削除"
        td_button2.name = "remove";
        td_button2.id = todo[i].id;
        td_id.innerHTML =todo[i].id;
        td_comment.innerHTML = todo[i].comment;
        tbody.appendChild(td_id);
        tbody.appendChild(td_comment);
        tbody.appendChild(td_button1);
        tbody.appendChild(td_button2);
        tbody.appendChild(tr);
    };

    // 追加したタスクのname名(state)から取得する
    btns_state = document.getElementsByName('state');
    for (let i=0; i < btns_state.length; i++) {
        btns_state[i].addEventListener('click', stateClick);
    };

    // 追加したタスクのname名(remove)から取得する
    btns_remove = document.getElementsByName('remove');
    for (let i=0; i < btns_remove .length; i++) {
        btns_remove [i].addEventListener('click', removeClick);
    };
}

//ステ-タス表示ボタンをクリックしたときの処理
function stateClick(){
    let id = this.id;
    if (this.value == "作業中"){
        todo.some(function(v, i){
        if(v.id == id) todo[i].state = "完了";
        });
    }else
    if(this.value == "完了"){
        todo.some(function(v, i){
        if(v.id == id) todo[i].state = "作業中";
        });
    }
    checkRadioButton();
}

//削除ボタンをクリックしたときの処理
function removeClick(){
    let id = this.getAttribute('id');
    todo.some(function(v, i){
        if(v.id ==id ) todo.splice(i, 1);
    });
    checkRadioButton();
    count_remove++;
}
