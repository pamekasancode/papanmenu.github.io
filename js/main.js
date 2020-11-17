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

document.getElementById("addForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  var nama = document.getElementById("nama").value;
  var harga = document.getElementById("harga").value;
  var cover = document.getElementById("cover").value;
  var kategori = document.getElementById("kategori").value;
  insertData(nama, harga, cover, kategori);
  document.getElementById("addForm").reset();
}

function insertData(nama, harga, cover, kategori) {
  var newData = menuRef.push();
  newData.set({
    nama: nama,
    harga: harga,
    cover: cover,
    kategori: kategori
  })
}

var dataMenu = document.getElementById("data");

menuRef.on("value", function(getData) {
  var row = "";
  var no = 1;
  getData.forEach((menu) => {
    var data = menu.val();
    row += `<tr>
                <td>${no++}</td>
                <td>${data.nama}</td>
                <td>${data.harga}</td>
                <td>${data.kategori}</td>
                <td><i class="fa fa-trash" id="hapus" data-target="${menu.key}"></i></td>
            </tr>`;
  })

  dataMenu.innerHTML = row;

  var trash = document.querySelectorAll("#hapus");
  trash.forEach((items) => {
    items.addEventListener("click", deleteData);
  })

})

function deleteData() {
  var target = this.dataset.target;
  firebase.database().ref("menu/"+target).remove();
}
