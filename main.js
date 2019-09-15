window.onload = () =>{
	console.log('lol');
	let btn = document.getElementById('btn_loader');
	let ul = document.getElementById('list1');
	let btn2  = document.getElementById('send');
	let btn3 = document.getElementById('delete');
	btn.onclick = () =>{
		ul.innerHTML = '';
		fetch('http://localhost:3000/posts')
			.then(result => result.json())
			.then(data => {
				data.forEach((item) =>{
					let li = document.createElement('li');
					li.classList.add("list-group-item");
					li.innerHTML = `<b>${item.author}</b> : ${item.title}`;
					ul.appendChild(li);
				})
			})
	};
	/*let request = {
		"method" : 'POST',
		"body" : JSON.stringify({"title": 'love', "author": 'lovers'}),
		'headers' : {'Content-Type': 'application/json'}
	}*/
	btn2.onclick = (event) =>{
		event.preventDefault();
		let author = document.getElementById('author').value;
		let title = document.getElementById('title').value;
		fetch('http://localhost:3000/posts', {
			"method" : "POST",
			"body" : JSON.stringify({"title" : title, "author" : author}),
			"headers" : {"Content-Type" : "application/json"}
		})
			.then(console.log('saved'))
			.catch(error => console.log(error))
	};
	btn3.onclick = () =>{
		fetch('http://localhost:3000/posts/5', {
			"method" : "DELETE",
		})
			.then(console.log('deleted'))
			.catch(er => console.log(er))
	}
}