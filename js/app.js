var firebaseConfig = {
  apiKey: "AIzaSyDBtisDllaikMZQjWSaw6p8yXet4rEWgsc",
  authDomain: "papanmenu.firebaseapp.com",
  databaseURL: "https://papanmenu.firebaseio.com",
  projectId: "papanmenu",
  storageBucket: "papanmenu.appspot.com",
  messagingSenderId: "389607195298",
  appId: "1:389607195298:web:cb656fbff68d121f554dfb"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
var menuRef = firebase.database().ref().child("menu");

function defaultMenu() {
	menuRef.on("value", function(getData) {
		var row = "";
		getData.forEach((result) => {
			var data = result.val();
			row += `<div class="col-6 col-lg-3">
	                    <img src="${data.cover}">
	                    <h5>${data.nama}</h5>
	                    <h4>${data.harga}</h4>
	                    <button class="btn btn-danger">Pesan</button>
	                </div>`;

		})

		document.getElementById("data").innerHTML = row;
		
	})
}

defaultMenu();

var link = document.querySelectorAll(".nav-link");
link.forEach((nav) => {
	nav.addEventListener("click", kategoriMenu);
})

function kategoriMenu() {
	var kategori = this.dataset.url;
	console.log(kategori)
	if(kategori == "menu") {
		document.getElementById("kategoriMakanan").innerHTML = "Semua Menu";
		defaultMenu();
		return;
	} 
	menuRef.on("value", function(data) {
		var content = "";
		data.forEach((res) => {
			var menu = res.val();
			if(menu.kategori == kategori) {
				content += `<div class="col-6 col-lg-3">
	                    <img src="${menu.cover}">
	                    <h5>${menu.nama}</h5>
	                    <h4>${menu.harga}</h4>
	                    <button class="btn btn-danger">Pesan</button>
	                </div>`;
			}
		
		})

		document.getElementById("data").innerHTML = content;
		document.getElementById("kategoriMakanan").innerHTML = kategori;

	})

} 

window.addEventListener("scroll", stickyNav);
function stickyNav() {
	var nav = document.querySelector(".navbar");
	nav.classList.toggle("sticky", window.scrollY > 10);
}