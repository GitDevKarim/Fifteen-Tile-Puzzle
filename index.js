const game_Properties = {
    OnGoing: false,
    timer: 1,
    moves: 1,
    timerHandler: null,
};
const emptyTile = {
    id: 0,
};

const startButton = document.getElementById("startButton");
const time = document.querySelector(".timer");
const moves = document.querySelector(".status");
const tiles = document.querySelectorAll(".tiles");
const result = document.querySelector(".result");

window.addEventListener("load", () => {
    time.innerHTML = `Time: ${game_Properties.timer - 1}`;
    moves.innerHTML = `Number of Moves: ${game_Properties.moves - 1}`;
    result.classList.add("hide");
});

startButton.addEventListener("click", () => {
    if (game_Properties.OnGoing) {
        return;
    }
    game_Properties.OnGoing = true;
    result.classList.add("hide");

    game_Properties.timerHandler = setInterval(() => {
        time.innerHTML = `Time: ${game_Properties.timer++}`;
    }, 1000);

    set();
});

const set = () => {
    for (let i = 0; i < tiles.length; i++) {
        const temp = tiles[i].innerHTML;
        const random = Math.floor(Math.random() * tiles.length) | 0;

        tiles[i].innerHTML = tiles[random].innerHTML;
        tiles[random].innerHTML = temp;
    }

    [...tiles].forEach((tile) => {
        tile.addEventListener("click", () => {
            if (!game_Properties.OnGoing) {
                return;
            }

            const tileID = Number(tile.id);
            const emptyID = Number(emptyTile.id);

            if (emptyID + 1 === tileID || emptyID - 1 === tileID) {
                //check if same row
                if (Math.floor(emptyID / 4) == Math.floor(tileID / 4)) {
                    moves.innerHTML = `Number of Moves: ${game_Properties.moves++}`;
                    Swap(tile);
                }

                return;
            }

            // check if same column
            if (emptyID + 4 === tileID || emptyID - 4 === tileID) {
                moves.innerHTML = `Number of Moves: ${game_Properties.moves++}`;
                Swap(tile);
            }
        });

        if (String(tile.innerHTML) === "Empty") {
            emptyTile.id = tile.id;
            tile.style.cssText = `background-color: darkred; color: white;`;
        }
    });
};

const Swap = (tile) => {
    if (!game_Properties.OnGoing) {
        return;
    }
    const getEmptyTile = document.getElementById(emptyTile.id);
    emptyTile.id = tile.id;

    const temp = tile.innerHTML;
    tile.innerHTML = getEmptyTile.innerHTML;

    getEmptyTile.removeAttribute("style");
    getEmptyTile.innerHTML = temp;
    tile.style.cssText = `background-color: darkred; color:white;`;

    if (Number(tile.id) === 15) {
        CheckFinal();
    }
};

const CheckFinal = () => {
    let flag = true;

    [...tiles].forEach((tile) => {
        if (
            Number(tile.id) + 1 === Number(tile.innerHTML) ||
            String(tile.innerHTML) === "Empty"
        ) {
            return;
        }

        flag = false;
    });

    flag ? Win() : null;
};

const Win = () => {
    game_Properties.OnGoing = false;
    clearInterval(game_Properties.timerHandler);

    result.classList.remove("hide");
    result.innerHTML = `You won in ${
        game_Properties.timer - 1
    } seconds<br>and ${game_Properties.moves - 1} moves`;

    document.getElementById(emptyTile.id).removeAttribute("style");
    game_Properties.moves = 1;
    game_Properties.timer = 1;
};
