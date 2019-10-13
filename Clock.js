class Clock
{
	constructor(x, y)
	{
		this.x = 110 + 60*x;
		this.y = 110 + 60*y;

		//let date = new Date();

		this.current = new Schedule(DEFAULT_H, DEFAULT_M);
		this.next = new Schedule(DEFAULT_H, DEFAULT_M);

		this.increment = new Schedule(0, 0);

		//this.ready = true;

		this.hoursPointerSize = 17;
		this.minutesPointerSize = 26;
	}

	setNextPosition(hours, minutes)
	{
		this.next.hours = hours;
		this.next.minutes = minutes;

		if(this.next.hours != this.current.hours)
		{
			this.increment.hours = this.next.hours - this.current.hours;
		}
		else
		{
			this.increment.hours = 0;
		}

		if(this.next.minutes != this.current.minutes)
		{
			this.increment.minutes = this.next.minutes - this.current.minutes;
		}
		else
		{
			this.increment.minutes = 0;
		}

		this.increment.becomeValid();

		this.increment.hours /= 250;
		this.increment.minutes /= 250;
	}

	update()
	{
		this.current.hours += this.increment.hours;
		this.current.minutes += this.increment.minutes;
	}

	draw()
	{
		noFill();
		stroke(100);
		strokeWeight(1);
		ellipse(this.x, this.y, 2*this.minutesPointerSize+8, 2*this.minutesPointerSize+8);

		noFill();
		stroke(255);
		strokeWeight(3);
		///HOURS POINTER
		line(this.x, this.y, this.x+this.hoursPointerSize*cos(this.current.hours), this.y+this.hoursPointerSize*sin(this.current.hours));
		///MINUTES POINTER
		line(this.x, this.y, this.x+this.minutesPointerSize*cos(this.current.minutes), this.y+this.minutesPointerSize*sin(this.current.minutes));
	}

}