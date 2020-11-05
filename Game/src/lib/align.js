class Align
{
	static scaleToGameW(obj,per)
	{
		obj.displayWidth=game_tutorial.config.width*per;
		obj.scaleY=obj.scaleX;
	}
	static centerH(obj)
	{
		obj.x=game_tutorial.config.width/2-obj.displayWidth/2;
	}
	static centerV(obj)
	{
		obj.y=game_tutorial.config.height/2-obj.displayHeight/2;
	}
	static center2(obj)
	{
		obj.x=game_tutorial.config.width/2-obj.displayWidth/2;
		obj.y=game_tutorial.config.height/2-obj.displayHeight/2;
	}
	static center(obj)
	{
		obj.x=game_tutorial.config.width/2;
		obj.y=game_tutorial.config.height/2;
	}
}