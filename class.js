
class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (this.multiply >= 6 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCell2(character, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;
            this.energy--;

        }

    }




    eat() {
        let emptyCells = this.chooseCell2(1, 4);
        let grass = random(emptyCells);

        if (grass) {
            let newX = grass[0];
            let newY = grass[1];


            for (let i in grassArr) {
                if (newX === grassArr[i].x && newY === grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i in kerparArr) {
                if (newX === kerparArr[i].x && newY === kerparArr[i].y) {
                    kerparArr.splice(i, 1);
                    break;
                }
            }

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;
        }
    }


    mul() {
        this.energy++;

        var newCell = random(this.chooseCell(0));
        if (this.energy >= 6 && newCell) {

            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grasseaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                }
            }
        }
    }
}


class Predator {
    constructor(x, y, index) {
        this.x = x,
            this.y = y,
            this.index = index;
        this.energy = 5;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    chooseCell2(character, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;
            this.energy--;
        }

    }
    eat() {
        let emptyCells = this.chooseCell2(1, 2);
        let uteliq = random(emptyCells);

        if (uteliq) {


            let newX = uteliq[0];
            let newY = uteliq[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;



            for (let i in grassArr) {
                if (newX === grassArr[i].x && newY === grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            for (let i in grasseaterArr) {
                if (newX === grasseaterArr[i].x && newY === grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }


            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 6 && newCell) {

            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}

class Kerpar {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 4;

        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;
            this.energy--;
        }

    }
    eat() {
        let emptyCells = this.chooseCell(3);
        let predator = random(emptyCells);

        if (predator) {
            let newX = predator[0];
            let newY = predator[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (newX === predatorArr[i].x && newY === predatorArr[i].y) {
                    predatorArr.splice(i, 3);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy++;
        }

    }

    mul() {
        this.energy++;

        var newCell = random(this.chooseCell(0));
        if (this.energy >= 4 && newCell) {

            var newKerpar = new Kerpar(newCell[0], newCell[1], this.index);
            kerparArr.push(newKerpar);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy++;
        }
    }







    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in kerparArr) {
                if (this.x == kerparArr[i].x && this.y == kerparArr[i].y) {
                    kerpar.splice(i, 1);
                }
            }
        }
    }

}

class Utox {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x-2, this.y-2],
            [this.x, this.y-2],
            [this.x+2, this.y-2],

        ]
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    chooseCell2(character, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    move() {

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat() {
        let emptyCells = this.chooseCell2(3, 4);
        let zoh = random(emptyCells);

        if (zoh) {


            let newX = zoh[0];
            let newY = zoh[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;



            for (let i in predatorArr) {
                if (newX === predatorArr[i].x && newY === predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            for (let i in kerparArr) {
                if (newX === kerparArr[i].x && newY === kerparArr[i].y) {
                    kerparArr.splice(i, 1);
                    break;
                }
            }


            this.x = newX;
            this.y = newY;
            this.energy += 3;
        }
    }
    mul() {
        this.energy++;

        var newCell = random(this.chooseCell(0));
        if (this.energy >= 5 && newCell) {

            var newUtox = new Utox(newCell[0], newCell[1], this.index);
            UtoxArr.push(newUtox);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in UtoxArr) {
                if (this.x == UtoxArr[i].x && this.y == UtoxArr[i].y) {
                    UtoxArr.splice(i, 1);
                }
            }

        }
    }
}






