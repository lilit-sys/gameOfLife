


var matrix = [];
n = 35;
m = 35;
var side = 20;
var grassArr = [];
var grasseaterArr = [];
var predatorArr = [];
var kerparArr = [];
var utoxArr = [];


function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            var rand = random([ 0, 1, 2, 3, 4, 5]);
            matrix[y][x] = rand;
        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2)
                grasseaterArr.push(ge);

            } else if (matrix[y][x] == 3) {
                var pe = new Predator(x, y, 3)
                predatorArr.push(pe);

            } else if (matrix[y][x] == 4) {
                var ke = new Kerpar(x, y, 4)
                kerparArr.push(ke);

            }
            else if (matrix[y][x] == 5) {
                var ut = new Utox(x, y, 5 )
                 utoxArr.push(ut);

            }
              
        }

    }
}


        function draw() {

            for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {

                    if (matrix[y][x] == 0) {
                        fill("gray");
                        rect(x * side, y * side, side, side);
                    }
                    else if (matrix[y][x] == 1) {
                        fill("green");
                        rect(x * side, y * side, side, side);
                    }
                    else if (matrix[y][x] == 2) {
                        fill("yellow");
                        rect(x * side, y * side, side, side);
                    } else if (matrix[y][x] == 3) {
                        fill("red");
                        rect(x * side, y * side, side, side);
                    } else if (matrix[y][x] == 4) {
                        fill("pink");
                        rect(x * side, y * side, side, side);
                    } else if (matrix[y][x] == 5) {
                        fill("blue");
                        rect(x * side, y * side, side, side);
                    }
                }

            }


            for (var i in grassArr) {
                grassArr[i].mul();
            }

            for (var i in grasseaterArr) {
                grasseaterArr[i].move();
                grasseaterArr[i].eat();
                grasseaterArr[i].mul();
                grasseaterArr[i].die();
            }
            for (var i in predatorArr) {
                predatorArr[i].move();
                predatorArr[i].eat();
                predatorArr[i].mul();
                predatorArr[i].die();
            }

            for (var i in kerparArr) {
                kerparArr[i].move();
                kerparArr[i].eat();
                kerparArr[i].mul();
                kerparArr[i].die();
            }

            for (var i in utoxArr) {
                utoxArr[i].move();
                utoxArr[i].eat();
                utoxArr[i].mul();
                utoxArr[i].die();
            }
        }
