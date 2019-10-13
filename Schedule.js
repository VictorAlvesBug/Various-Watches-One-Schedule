class Schedule
{
	constructor(hoursAngle, minutesAngle)
	{
		this.hours = hoursAngle;
		this.minutes = minutesAngle;
	}

	becomeValid()
	{
		while(this.hours < -2*PI)
		{
			this.hours += 2*PI;
		}

		while(this.hours > 0)
		{
			this.hours -= 2*PI;
		}

		while(this.minutes < 0)
		{
			this.minutes += 2*PI;
		}

		while(this.minutes > 2*PI)
		{
			this.minutes -= 2*PI;
		}
	}
}