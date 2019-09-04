
const inputBox = document.querySelector(".todo");
const ul = document.querySelector(".myul");
const active = document.querySelector(".active_buttn");
const complete = document.querySelector(".complete_buttn");
const alll =  document.querySelector(".all_buttn");
const clearBtn =  document.querySelector(".clrbtn");
let allTodo = JSON.parse(localStorage.getItem('allTodo')) || [];

function handleInput(e){

	if(e.keyCode === 13){
		let todo = {
			content: event.target.value,
			done : false
		}

		allTodo.push(todo);
		display(allTodo, ul);
		localStorage.setItem('allTodo', JSON.stringify(allTodo));
		event.target.value = "";
		

	}
};


function display(todo, displaylists){
	displaylists.innerHTML = todo.map((list, i) => {
		return `
		<li>
		<input type ="checkbox" data-index=${i} data-id="todo${i}" ${list.done? 'checked' : ''} />
		<label for ="todo${i}">${list.content}</label>
		<button class ="del-buttn" data-id = "todo${i}">X</button>
		</li>


		`
	}).join('');
	}




	function checkDone(item){
		if(!item.target.matches('input')) return;
			const liitems = item.target;
			const index = liitems.dataset.index;
			allTodo[index].done = !allTodo[index].done;

			localStorage.setItem('allTodo', JSON.stringify(allTodo));
			display(allTodo, ul);


	}

	function handleDel(event){
		const buttnId = event.target.dataset.id;
		if(event.target.className === "del-buttn") {
			allTodo.splice(buttnId, 1);
			localStorage.setItem('allTodo', JSON.stringify(allTodo));
			display(allTodo, ul);
		}
	};

	function activated(){
		const act = allTodo.filter((todo)=>todo.done==false);
		display(act, ul);
	};

	function completed(){
		const comp = allTodo.filter((todo) => todo.done== true);
		display(comp, ul);
	};

	function all(){
		display(allTodo, ul);
	};

	function clearComplete(){
		const clrcomplete = []
		display(clrcomplete, ul)
	}





	inputBox.addEventListener("keydown", handleInput);
	ul.addEventListener("click", checkDone);
	ul.addEventListener("click", handleDel);
	active.addEventListener("click", activated);
	complete.addEventListener("click", completed);
	alll.addEventListener("click", all);
	clearBtn.addEventListener("click", clearComplete);

	display(allTodo, ul);
