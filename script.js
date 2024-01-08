var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    // kecepatan ular. Memindahkan satu panjang kisi setiap frame ke arah x atau y
    dx: grid,
    dy: 0,

    // melacak semua grid yang ditempati tubuh ular
    cells: [],

    // panjang ular. tumbuh saat makan apel
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};

// Dapatkan bilangan bulat acak dalam rentang tertentu
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
    requestAnimationFrame(loop);

    // memperlambat Game Loop ke 15 fps, bukan 60 (60/15 = 4)
    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // menggerakkan ular berdasarkan kecepatan
    snake.x += snake.dx;
    snake.y += snake.dy;

    //  Bungkus posisi ular secara horizontal di tepi layar
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // Bungkus posisi ular secara vertikal di tepi layar
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // Melacak di mana ular berada. depan array selalu kepala
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Hapus sel saat menjauh darinya
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // gambar apel sebagai makananan ular
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // Gambar ular satu sel pada satu waktu
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {

        // Menggambar 1 px lebih kecil dari grid menciptakan efek grid di tubuh ular sehingga Anda dapat melihat berapa panjangnya
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // saat ular makan apel
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;

            // karna canvas ukuran 400x400 berarti ada 25x25 grids 
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // Periksa tabrakan dengan semua sel setelah nya (modified bubble sort)
        for (var i = index + 1; i < snake.cells.length; i++) {

            // Ular menempati ruang yang sama dengan bagian tubuh, reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;

                window.location.href = "lose.html";
                
            }
        }
    });
}

// listener keyboard events untuk menggerakkan ular
document.addEventListener('keydown', function (e) {

    // left arrow key
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

// mulai game
requestAnimationFrame(loop);