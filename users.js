// Fungsi untuk mengambil data skor dari URL yang disediakan
function fetchScores() {
    fetch("https://ets-pemrograman-web-f.cyclic.app/scores/score")
      .then((response) => response.json())
      .then((data) => {
        displayUsers(data.data); // Menggunakan data.data karena data utama terletak di properti "data"
      })
      .catch((error) => console.error("Error:", error));
  }
  
  function displayUsers(users) {
    let table = document.getElementById("user-table");
    // Mengurutkan data berdasarkan skor secara menurun
    users.sort((a, b) => b.score - a.score);
    // Mengambil hanya 3 data teratas
    let topThreeUsers = users.slice(0, 3);
    topThreeUsers.forEach((user) => {
      let row = table.insertRow(-1);
      let nameCell = row.insertCell(0);
      let scoreCell = row.insertCell(1);
      nameCell.innerHTML = user.nama;
      scoreCell.innerHTML = user.score;
    });
  }
  
  // Panggil fungsi untuk mengambil dan menampilkan data pengguna saat halaman dimuat
  fetchScores();
  