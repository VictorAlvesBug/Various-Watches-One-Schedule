var clock;
var RIGHT, UP, LEFT, DOWN, DEFAULT_H, DEFAULT_M;
var schedule;
var count = 0;

function setup()
{
	createCanvas(700, 700);

	schedule = new Schedule(0, 0);

	RIGHT = 0;
	UP = 3*PI/2;
	LEFT = PI;
	DOWN = PI/2; 

	let date = new Date();

	DEFAULT_M = map(date.getMinutes(), 0, 15, 3*PI/2, 2*PI);
	DEFAULT_H = map(date.getHours()%12, 0, 3, 3*PI/2, 2*PI);
	DEFAULT_H += map(DEFAULT_M, 0, 60, 0, PI/6)

	clock = [];

	for(let x=0; x<9; x++)
	{
		clock[x] = [];
		for(let y=0; y<9; y++)
		{
			clock[x][y] = new Clock(x, y);
		}		
	}
	setSchedule(date.getHours(), date.getMinutes());
}

function draw()
{
	background(0);
	frameRate(50);

	let date = new Date();

	DEFAULT_M = map(date.getMinutes(), 0, 15, 3*PI/2, 2*PI);
	DEFAULT_H = map(date.getHours()%12, 0, 3, 3*PI/2, 2*PI);
	DEFAULT_H += map(DEFAULT_M, 0, 60, 0, PI/6)

	if(count == 550 && date.getSeconds() == 60-4)
	{
		schedule.hours = date.getHours();
		schedule.minutes = date.getMinutes();

		count = 0;
		
		drawClocks();
	}
	else
	{
		if(count < 550)
		{
			if(count == 0)
			{
				drawStar();
			}

			if(count == 250)
			{
				date
				setSchedule(date.getHours(), date.getMinutes());
			}

			if(count < 250 || count >= 300)
			{
				for(let x=0; x<9; x++)
				{
					for(let y=0; y<9; y++)
					{
						clock[x][y].update();
					}		
				}
			}

			count++;
		}
		else
		{
			for(let x=0; x<9; x++)
			{
				for(let y=0; y<9; y++)
				{
					clock[x][y].current.hours = clock[x][y].next.hours;
					clock[x][y].current.minutes = clock[x][y].next.minutes;
				}		
			}
		}

		drawClocks();
	}
}

function drawStar()
{
	for(let x=0; x<9; x++)
	{
		for(let y=0; y<9; y++)
		{
			let px = x-4;
			let py = y-4;
			let arrowAngle;

			arrowAngle = atan2(py, px) + PI;

			while(arrowAngle < 0)
			{
				arrowAngle += 2*PI;
			}

			while(arrowAngle > 2*PI)
			{
				arrowAngle -= 2*PI;
			}

			if(x == 4 && y == 4)
			{
				clock[x][y].setNextPosition(DEFAULT_H, DEFAULT_M);
			}
			else
			{
				let distance = dist(4, 4, x, y);
				let halfAmplitud = map(distance, 0, 4, 1, 0.1);
				clock[x][y].setNextPosition(arrowAngle-halfAmplitud, arrowAngle+halfAmplitud);
			}
		}		
	}
}

function setSchedule(hours, minutes)
{
	//VALIDATION
	if(hours<0 || hours>23 || minutes<0 || minutes>59)
	{
		console.log("Invalid Input --> (" + hours + ":" + minutes + ")");
		return;
	}

	//GO TO FLOWER
	// ARROWS FROM CENTER
	// CENTER WITH PREVIEW SCHEDULE

	//GO TO CURRENT SCHEDULE


	// X (0,8)
	// Y (3,5)
	// REMAINDER GO TO 3/4 PI

	// DIGITS --> 12:34

	for(let x=0; x<9; x++)
	{
		for(let y=0; y<9; y++)
		{
			clock[x][y].setNextPosition(DEFAULT_H, DEFAULT_M);
		}		
	}

	let digit1 = Math.trunc(hours/10);
	let digit2 = hours-10*digit1;
	let digit3 = Math.trunc(minutes/10);
	let digit4 = minutes-10*digit3;

	setDigit(1, digit1);
	setDigit(2, digit2);
	setDigit(3, digit3);
	setDigit(4, digit4);

	drawClocks();
}

function setDigit(digit, value)
{
	let offsetX = 0;
	let offsetY = 3;

	switch(digit)
	{
		case 1:
		offsetX = 0;
		break;

		case 2:
		offsetX = 2;
		break;

		case 3:
		offsetX = 5;
		break;

		case 4:
		offsetX = 7;
		break;
	}

	switch(value)
	{
		case 0:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, DOWN);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(UP, DOWN);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(UP, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(LEFT, UP);
		break;


		case 1:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(DEFAULT_H, DEFAULT_M);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(DOWN, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(DEFAULT_H, DEFAULT_M);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(UP, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(DEFAULT_H, DEFAULT_M);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(UP, UP);
		break;

		case 2:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, RIGHT);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(RIGHT, DOWN);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(LEFT, UP);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(LEFT, LEFT);
		break;

		case 3:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, RIGHT);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(RIGHT, RIGHT);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(LEFT, UP);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(RIGHT, RIGHT);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(LEFT, UP);
		break;

		case 4:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(DOWN, DOWN);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(DOWN, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(UP, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(DEFAULT_H, DEFAULT_M);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(UP, UP);
		break;

		case 5:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, DOWN);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, LEFT);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(RIGHT, RIGHT);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(LEFT, UP);
		break;

		case 6:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, DOWN);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, LEFT);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(UP, DOWN);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(LEFT, UP);
		break;

		case 7:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, RIGHT);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(DEFAULT_H, DEFAULT_M);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(UP, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(DEFAULT_H, DEFAULT_M);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(UP, UP);
		break;

		case 8:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, DOWN);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(LEFT, UP);
		break;

		case 9:
		clock[ offsetX+0 ][ offsetY+0 ].setNextPosition(RIGHT, DOWN);
		clock[ offsetX+1 ][ offsetY+0 ].setNextPosition(LEFT, DOWN);
		clock[ offsetX+0 ][ offsetY+1 ].setNextPosition(RIGHT, UP);
		clock[ offsetX+1 ][ offsetY+1 ].setNextPosition(UP, DOWN);
		clock[ offsetX+0 ][ offsetY+2 ].setNextPosition(RIGHT, RIGHT);
		clock[ offsetX+1 ][ offsetY+2 ].setNextPosition(LEFT, UP);
		break;
	}
}

function drawClocks()
{
	noFill();
	stroke(255);
	strokeWeight(1);
	ellipse(clock[4][4].x, clock[4][4].y, 650, 650);


	for(let x=0; x<9; x++)
	{
		for(let y=0; y<9; y++)
		{
			if(dist(4, 4, x, y) <= 4.3)
			{
				clock[x][y].draw();
			}
		}		
	}
}