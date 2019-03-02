function getEmptyRequestBody(width = 20, height = 20, turn = 0) {
  let body = {};

	body['board'] = {};
  body['you'] = {};
  body['game'] = {};

	body.board.height = width;
  body.board.width = height;
  body.board.food = [];
  body.board.snakes = [];
	body['turn'] = turn;
  body.game.id = 1;

	return body;
}

function addFood(body, x, y) {
	const food = {
		'x': x,
		'y': y
	};

	body.board.food.push(food);
}

function makeRandomString() {
  let text = '';
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function addSnake(body, snakeCoords, health = 100, name = makeRandomString(), id = makeRandomString()) {
	const snakeBody = [];

	for (let i = 0; i < snakeCoords.length; i++) {
		const point = {
			'x': snakeCoords[i].x,
			'y': snakeCoords[i].y
		};

		snakeBody.push(point);
	};

	var snake = {
    'id': id,
    'name': name,
	  'health': health,
		'body': snakeBody,
	};

	body.board.snakes.push(snake);
}

function addYou(body, snakeCoords, health = 100, name = makeRandomString(), id = makeRandomString()) {
	// You need to be in the snakes array also
	addSnake(body, snakeCoords, health, name, id);

  let yourBody = [];

	for (var i = 0; i < snakeCoords.length; i++) {
		var point = {
			'x': snakeCoords[i].x,
			'y': snakeCoords[i].y
		};

		yourBody.push(point);
	};

	var yourSnake = {
    'id': id,
    'name': name,
	  'health': health,
		'body': yourBody,
	};

	body.you = yourSnake;
}

function printBoard(body) {
	// Create board
  let board = [];

	for (let i = 0; i < body.board.width; i++) {
    let row = [];

		for (let j = 0; j < body.board.height; j++) {
			row.push('-');
    }

		board.push(row);
	}

	// Add food
	for (let i = 0; i < body.board.food.length; i++) {
		let food = body.board.food[i];
		board[food.x][food.y] = 'F';
	}

	// Find your snake id
	let yourId = body.you.id;

	// Add snakes
	for (let i = 0; i < body.board.snakes.length; i++) {
    let snake = body.board.snakes[i];

		for(let j = 0; j < snake.body.length; j++) {
      let coord = snake.body[j];

			// Print your snake differently
			if (j == 0) {
				if (snake.id == yourId) {
					board[coord.x][coord.y] = 'y';
				} else {
					board[coord.x][coord.y] = 'e';
				}
			} else {
				if (snake.id == yourId) {
					board[coord.x][coord.y] = '*';
				} else {
					board[coord.x][coord.y] = '#';
				}
			}
		}
	}

	// Print how much health you have
	console.log('\n\nYou have ' + body.you.health + ' health!');

	// Print board
	for (let i = 0; i < body.board.height; i++) {
		for (let j = 0; j < body.board.width; j++) {
			process.stdout.write(board[j][i] + ' ');
		}

		console.log('');
	}
}

module.exports = {
   getEmptyRequestBody: getEmptyRequestBody,
   addFood: addFood,
   addSnake: addSnake,
   addYou: addYou,
   printBoard: printBoard
}
