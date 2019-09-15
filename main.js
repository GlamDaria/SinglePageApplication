window.onload = () =>{
	console.log('lol');
	let btn = document.getElementById('btn_loader');
	let ul = document.getElementById('list1');
	let btn2  = document.getElementById('send');
	let btn3 = document.getElementById('delete');
	function loadAuthor(){
		ul.innerHTML = '';
		fetch('http://localhost:3000/posts')
			.then(result => result.json())
			.then(data => {
				data.forEach((item) =>{
					let li = document.createElement('li');
					li.classList.add("list-group-item");
					li.innerHTML = `<p><b>${item.author}</b> : ${item.title}<button type="button" class="close" aria-label="Close"><span aria-hidden="true" id="btn_close${item.id}" data-id="${item.id}">&times;</span></button></p>`;
					ul.appendChild(li);
				})
			})
	}
	function deleteAuthor(id){
		fetch('http://localhost:3000/posts/'+id, {
			"method" : "DELETE"
		})
			.then(console.log("Author "+ id + " is deleted"))
			.catch(er => console.log(er));
			loadAuthor();
	}
	function addAuthor(){
		event.preventDefault();
		let author = document.getElementById('author').value;
		let title = document.getElementById('title').value;
		fetch('http://localhost:3000/posts', {
			"method" : "POST",
			"body" : JSON.stringify({"title" : title, "author" : author}),
			"headers" : {"Content-Type" : "application/json"}
		})
			.then(console.log('saved'))
			.catch(error => console.log(error));
		loadAuthor();
	}
	btn.onclick = () =>{
		loadAuthor();
	};
	btn2.onclick = (event) =>{
		addAuthor();
	};
	ul.addEventListener("click", (event) =>{
		let target = event.target;
		if (target.tagName != "SPAN") return;
		deleteAuthor(target.dataset.id);
		})

	/*let request = {
		"method" : 'POST',
		"body" : JSON.stringify({"title": 'love', "author": 'lovers'}),
		'headers' : {'Content-Type': 'application/json'}
	}*/
	/*
	btn3.onclick = () =>{
		fetch('http://localhost:3000/posts/5', {
			"method" : "DELETE",
		})
			.then(console.log('deleted'))
			.catch(er => console.log(er))
	}*/
}