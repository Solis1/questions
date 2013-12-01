     //x-25, y5, z90
/*
//----------------------------------------------------------------------------
// File........... : Draw3DMain.js
// Project........ :
// Created ....... : 11/10/2011 10:00
// Modified....... : 20/10/2011 03:00
// Version ....... : 1.03
// Author ........ : Moshe Halevi
//                 : halemo@gmail.com
//                 :
// Compiler        : HTML5
// Module ........ : 3D Main Program Logic (3D implementation)
// Sub-module .... :
// Description ... : Main JavaScript Program. 
//                 : Handle events and button commands 
//----------------------------------------------------------------------------
*/


/*
//----------------------------------------------------------------------------
//Globals
//----------------------------------------------------------------------------
var g_CanvasId = 'Canvas3D';
//var g_ctx3d; // = new Draw3D();
//g_ctx3d.SetCanvas(g_CanvasId);

var g_MoveXYZ = [0,0,0];  //0=X, 1=Y, 2=Z

//var g_Object3D = "Cubiod";
var g_Object3D = "CuboidDivided";
var nqx = 4;
var nqy = 4;
var nqz = 4;
var dot_x = 4;
var dot_y = 1;
var dot_z = 4;
var g_Object3D_Sides = 3;
var g_Object3D_ColorOutline = "blue";
var g_Object3D_ColorFill = "pink";



//----------------------------------------------------------------------------
function Main3D_Run()
{
   Main3D_Init();
}
*/


















//----------------------------------------------------------------------------
function Main3D_Init()
{
   g_ctx3d = new Draw3D();
   g_ctx3d.SetCanvas(g_CanvasId);
   //Changes
   g_ctx3d.ResetAxes();
   g_MoveXYZ[0] = 0;
   g_MoveXYZ[1] = 0;
   g_MoveXYZ[2] = 0;

   if (1) //Events Capture
   {
	   var useCapture = false;
	   var element = g_ctx3d.canvas;
       var handlerFunction;;
       
       handlerFunction = Main3D_EventKeyboard;
       window.addEventListener('keydown', handlerFunction, useCapture);
	   
	   //add event handlers
       handlerFunction = Main3D_EventMouse;
	   element.addEventListener('mousemove', handlerFunction, useCapture);   
	   element.addEventListener('mousedown', handlerFunction, useCapture);   
	   element.addEventListener('mouseup', handlerFunction, useCapture);   
	   //element.addEventListener('mousewheel', handlerFunction, useCapture);   
       element.addEventListener('mouseover', handlerFunction, useCapture);
       element.addEventListener('mouseout', handlerFunction, useCapture);
   }
   
   Main3D_SelectColorInit();
 
   //g_ctx3d.SetAxes(-400,400,40,-400,400,40,-400,400,40);
   g_ctx3d.SetAxes(0,800,40,0,800,40,0,800,40);
   Main3D_Draw();
   
}
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
function Main3D_Draw()
{
    var mx = g_MoveXYZ[0];
    var my = g_MoveXYZ[1];
    var mz = g_MoveXYZ[2];
    //var g_Object3D = "Cubiod";
    //var Sides = g_Object3D_Sides;

    //----------------------------------------------
    //Update Input elements on page
    //----------------------------------------------
    Main3D_GetAxes(g_ctx3d);
    Main3D_GetAngles(g_ctx3d);
    Main3D_GetPoints(g_ctx3d,false,0,0);
    
    //----------------------------------------------
    //Draw Axes X,Y,Z & U,V
    //----------------------------------------------
    g_ctx3d.Clear();
/*	Changes
    g_ctx3d.cu = 30;
    g_ctx3d.cv = 600;

*/
    g_ctx3d.DrawAxes();
    //g_ctx3d.SetAxes(-800,400,40,-400,400,40,-400,400,40);

    
    //----------------------------------------------
    //Draw 3D Object
    //----------------------------------------------
    if (g_Object3D == "Shape")
    {
        //var Sides = 5;
        var Sides = g_Object3D_Sides;
        var R = 50;
        g_ctx3d.Prisma(mx,my,mz,0,0,0, R, Sides, g_Object3D_ColorOutline,g_Object3D_ColorFill);
    }
    else
    if (g_Object3D == "Prisma")
    {
        var Sides = g_Object3D_Sides;
        var R = 50;
        g_ctx3d.Prisma(mx,my,mz,0,0,2*R, R, Sides, g_Object3D_ColorOutline,g_Object3D_ColorFill);
    }
    else
    if (g_Object3D == "PrismaTruncated")
    {
        var Sides = g_Object3D_Sides;
        var R = 50;
        g_ctx3d.PrismaTruncated(mx,my,mz,0,0,2*R, R,Sides, g_Object3D_ColorOutline,g_Object3D_ColorFill);
    }
    else
    if (g_Object3D == "PrismaConus")
    {
        var Sides = g_Object3D_Sides;
        var R = 50;
        g_ctx3d.PrismaConus(mx,my,mz,0,0,2*R, R,Sides, g_Object3D_ColorOutline,g_Object3D_ColorFill);
    }
    else
    if (g_Object3D == "Line")
    {    
        var LL = 150; //Line Length
        g_ctx3d.Line(mx,my,mz, mx+LL,mx+LL,mx+2*LL, g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "Cubiod")
    {
        var LX = 200;
        var LY = 200;
        var LZ = 200;
        g_ctx3d.Cubiod(mx,my,mz, LX,LY,LZ,g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "CuboidDivided")
    {
        var LX = 300;
        var LY = 300;
        var LZ = 300;
        var color = 'black';
        g_ctx3d.CuboidDivided(mx,my,mz, LX,LY,LZ,g_Object3D_ColorOutline, nqx, nqy, nqz, dot_x, dot_y, dot_z);
    }
    else
    if (g_Object3D == "Cube")
    {
        var LX = 100;
        var LY = 100;
        var LZ = 100;
        g_ctx3d.Cubiod(mx,my,mz, LX,LY,LZ,g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "SinRR_RR")
    {
        g_ctx3d.SinRR_RR(mx,my,mz,g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "Pyramid")
    {
        var LX = 100;
        var LY = 100;
        var LZ = 200;
        g_ctx3d.Pyramid(mx,my,mz,LX,LY,LZ,g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "Conus")
    {
        var LR = 100;
        var LH = 200;
        g_ctx3d.Conus(mx,my,mz, LR,LH, g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "Cylinder")
    {
        var LR = 100;
        var LH = 200;
        g_ctx3d.Cylinder(mx,my,mz, LR,LH,g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "Sphere")
    {
        var LR = 100;
        g_ctx3d.Sphere(mx,my,mz, LR, g_Object3D_ColorOutline);
    }
    else
    if (g_Object3D == "Circle")
    {
        var LR = 100;
        g_ctx3d.Circle(mx,my,mz, LR, g_Object3D_ColorOutline);
    }   
    //g_ctx3d.DrawAxes();
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
function Main3D_EventKeyboard(ev)
{
    var x,y;
    var e;  //event
	var target; //the object the event occured in (use taeget.id to find its name)
	
	//---------------------------------------------------
	//find the event source
	//---------------------------------------------------
	if (!ev)
    {	
	   e = window.event;
	}
	else
	{
	   e = ev;
	}
	//---------------------------------------------------
	//find the event target
	//---------------------------------------------------
	if (e.target)
    {	
	   //netscape
	   target = e.target;
	}   
	else 
	if (e.srcElement)
    {
	    //microsoft
    	target = e.srcElement;
	}
	if (target.nodeType == 3)  //3=text node
    {	
	    // defeat Safari bug
		target = target.parentNode;
	}
	//---------------------------------------------------
	//do something with the event
	//---------------------------------------------------	
	if (e.type == 'keydown')
	{
        switch (e.keyCode) //tested on FireFox browser
        {
            case  9:  // TAB was pressed
                      break;
            case 27:  // Escape was pressed
                      Main3D_InvertColors();
                      break;
            default:  //check if ascii key was pressed
                      if (1)
                      {
                      }
                      break;
                          
	    } //switch
	}
}
//----------------------------------------------------------------------------
function EventButton(e)
{
   Main3D_EventButton(e);
}
//----------------------------------------------------------------------------
function Main3D_EventButton(e)
{
   var strArr;
   if (e)
   {
      var step = 5; //move step
      var stepUV = Main3D_GetStepUV();
      var stepXYZ = Main3D_GetStepXYZ();
      
      var Index = 0;
      var Action = "";
      strArr = e.id.split(".");
	  
	  Action = strArr[0].toUpperCase();
	  Index = parseInt(strArr[1]);
      //alert(strArr[1]);
	  
	  if (Action == "TEST")
	  {

            //Main3D_Draw();
	  }
	  else
	  if (Action == "RESET")
	  {
            g_ctx3d.Reset();
            Main3D_Draw();
	  }
	  else
	  if (Action == "VIEW3D")
	  {
            g_ctx3d.View3D();
            Main3D_Draw();
	  }
	  else
	  if (Action == "TOPVIEWX")
	  {
            g_ctx3d.ViewTopX();
            Main3D_Draw();
	  }
	  else
	  if (Action == "TOPVIEWY")
	  {
            g_ctx3d.ViewTopY();
            Main3D_Draw();
	  }
	  else
	  if (Action == "TOPVIEWZ")
	  {
            g_ctx3d.ViewTopZ();
            Main3D_Draw();
	  }
	  else
	  if (Action == "ZOOMIN")
	  {
            //g_ctx3d.ZoomIn();
            g_ctx3d.ZoomBy(1.1);
            Main3D_Draw();
	  }
	  else
	  if (Action == "ZOOMOUT")
	  {
            //g_ctx3d.ZoomOut();
            g_ctx3d.ZoomBy(1/1.1);
            Main3D_Draw();
	  }
	  else
	  if (Action == "ZOOMONE")
	  {
            //g_ctx3d.ZoomOut();
            g_ctx3d.ZoomTo(1);
            Main3D_Draw();
	  }
	  else
	  if (Action == "POV_UP")
	  {
            g_ctx3d.RotatePOV(2);
            Main3D_GetAngles(g_ctx3d);
            Main3D_Draw();
	  }
	  else
	  if (Action == "POV_DOWN")
	  {
            g_ctx3d.RotatePOV(-2);
            Main3D_GetAngles(g_ctx3d);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_X_M")
	  {
            g_ctx3d.RotateX(-1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_X_P")
	  {
            g_ctx3d.RotateX(1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_Y_M")
	  {
            g_ctx3d.RotateY(-1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_Y_P")
	  {
            g_ctx3d.RotateY(1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_Z_M")
	  {
            g_ctx3d.RotateZ(-1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_Z_P")
	  {
            g_ctx3d.RotateZ(1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_XY_M")
	  {
            g_ctx3d.RotateX(-1);
            g_ctx3d.RotateY(-1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_XY_P")
	  {
            g_ctx3d.RotateX(1);
            g_ctx3d.RotateY(1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_XYZ_M")
	  {
            g_ctx3d.RotateX(-1);
            g_ctx3d.RotateY(-1);
            g_ctx3d.RotateZ(-1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ROTATE_XYZ_P")
	  {
            g_ctx3d.RotateX(1);
            g_ctx3d.RotateY(1);
            g_ctx3d.RotateZ(1);
            Main3D_Draw();
	  }
      else
	  if (Action == "ANGLES45")
	  {
            g_ctx3d.SetAngleX(0);
            g_ctx3d.SetAngleY(45);
            g_ctx3d.SetAngleZ(90);
            Main3D_Draw();
	  }
      else
	  if (Action == "ANGLES15")
	  {
            g_ctx3d.SetAngleX(-15);
            g_ctx3d.SetAngleY(15);
            g_ctx3d.SetAngleZ(90);
            Main3D_Draw();
	  }

      else
	  if (Action == "FLIPU")
      {
            g_ctx3d.TransformU *= (-1);
            Main3D_Draw();
      }
      else
	  if (Action == "FLIPV")
      {
            g_ctx3d.TransformV *= (-1);
            Main3D_Draw();
      }

      else
	  if (Action == "GETAXES")
      {
            Main3D_GetAxes(g_ctx3d);
            //Main3D_Draw();
      }
      else
	  if (Action == "SETAXES")
      {
            Main3D_SetAxes(g_ctx3d);
            Main3D_Draw();
      }
      else
	  if (Action == "RESETAXES")
      {
            g_ctx3d.ResetAxes();
            Main3D_GetAxes(g_ctx3d);
            Main3D_Draw();
      }
      else
	  if (Action == "CLEARAXES")
      {
            Main3D_ClearAxes();
            //Main3D_Draw();
      }
      else
	  if (Action == "GETANGLES")
      {
            Main3D_GetAngles(g_ctx3d);
            //Main3D_Draw();
      }
      else
	  if (Action == "SETANGLES")
      {
            Main3D_SetAngles(g_ctx3d);
            Main3D_Draw();
      }
      else
	  if (Action == "CLEARANGLES")
      {
            Main3D_ClearAngles();
            //Main3D_Draw();
      }
      else
	  if (Action == "RESETANGLES")
      {
            g_ctx3d.ResetAngles();
            Main3D_GetAngles(g_ctx3d);
            Main3D_Draw();
      }
      else
	  if (Action == "SETPOINTSXYZ")
      {
            Main3D_SetPointsXYZ(g_ctx3d,false,0,0,0);
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_X_M")
      {
            g_MoveXYZ[0] -= stepXYZ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_Z_P")
      {
            g_MoveXYZ[2] += stepXYZ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_Y_P")
      {
            g_MoveXYZ[1] += stepXYZ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_XY_MM")
      {
            g_MoveXYZ[0] -= stepXYZ;
            g_MoveXYZ[1] -= stepXYZ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_O")
      {
            g_MoveXYZ[0] = 0;
            g_MoveXYZ[1] = 0;
            g_MoveXYZ[2] = 0;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_XY_PP")
      {
            g_MoveXYZ[0] += stepXYZ;
            g_MoveXYZ[1] += stepXYZ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_Y_M")
      {
            g_MoveXYZ[1] -= stepXYZ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_Z_M")
      {
            g_MoveXYZ[2] -= stepXYZ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_X_P")
      {
            g_MoveXYZ[0] += stepXYZ;
            Main3D_Draw();
      }
      //------------------------------------
      //------------------------------------
      else
	  if (Action == "MOVE_UV_MM")
      {
            //var step = Main3D_GetStepUV();
            //alert(step);
            g_ctx3d.cu -= stepUV;
            g_ctx3d.cv -= stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_V_M")
      {
            g_ctx3d.cv -= stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_UV_PM")
      {
            g_ctx3d.cu += stepUV;
            g_ctx3d.cv -= stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_U_M")
      {
            g_ctx3d.cu -= stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_UV_O")
      {
            g_ctx3d.cu = g_ctx3d.width / 2 ;
            g_ctx3d.cv = g_ctx3d.height / 2 ;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_U_P")
      {
            g_ctx3d.cu += stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_UV_MP")
      {
            g_ctx3d.cu -= stepUV;
            g_ctx3d.cv += stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_V_P")
      {
            g_ctx3d.cv += stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "MOVE_UV_PP")
      {
            g_ctx3d.cu += stepUV;
            g_ctx3d.cv += stepUV;
            Main3D_Draw();
      }
      else
	  if (Action == "SELECTCOLORFILL")
      {
           Main3D_SelectColor(e);
           Main3D_Draw();

      }
      else
	  if (Action == "SELECTCOLOROUTLINE")
      {
           Main3D_SelectColor(e);
           Main3D_Draw();

      }
      else
	  if (Action == "SETOBJECT3D")
      {
            Main3D_SetObject3D(e);
            Main3D_Draw();

      }
      else
	  if (Action == "SETCANVAS")
      {
            Main3D_SetCanvas(g_ctx3d.canvas);
            Main3D_Draw();

      }
     
   }
}
//----------------------------------------------------------------------------
function EventMouse(ev)
{
   Main3D_EventMouse(ev);
}
//----------------------------------------------------------------------------
function Main3D_EventMouse(ev)
{
    //note: we must set CSS file to:
    // cavas
    // {
    //    position: relative; 
    //   
    // }
    //
    // so we can get the clientX & clientY proper position


    var x,y;
    var e;  //event
	var target; //the object the event occured in (use taeget.id to find its name)
    var type;
	
	//---------------------------------------------------
	//find the event source
	//---------------------------------------------------
	if (!ev)
    {	
	   e = window.event;
	}
	else
	{
	   e = ev;
	}
	
	//---------------------------------------------------
	//save the event type
	//---------------------------------------------------
    type = e.type;
    
	//---------------------------------------------------
	//find the event target
	//---------------------------------------------------
	if (e.target)
    {	
	   //netscape
	   target = e.target;
	}   
	else 
	if (e.srcElement)
    {
	    //microsoft
    	target = e.srcElement;
	}
	if (target.nodeType == 3)  //3=text node
    {	
	    // defeat Safari bug
		target = target.parentNode;
	}

	//---------------------------------------------------
	//find the x,y of the event target
	//---------------------------------------------------	
    // Get the mouse position relative to the canvas element.
    if (e.layerX || ev.layerX == 0) 
    { 
       // Firefox
       x = e.layerX;
       y = e.layerY;
    } 
    else
    if (e.offsetX || e.offsetX == 0) 
    { 
       // Opera
       x = e.offsetX;
       y = e.offsetY;
    }
    
    //fix to client x,y
    //x = e.clientX;
    //y = e.clientY; 
    x = e.clientX - e.target.offsetLeft; 
    y = e.clientY - e.target.offsetTop; 

	//---------------------------------------------------
	//do something with the event
	//---------------------------------------------------	
    //-----------------------
    //mousedown event
    //-----------------------
	if (type == 'mousedown' || type == 'mouseclick')
	{
       if (1)
       {

           //x = e.clientX - e.target.offsetLeft; 
           //y = e.clientY - e.target.offsetTop; 
           //x = e.clientX - e.target.offsetLeft; 
           //y = e.clientY - e.target.offsetTop; 
           //x = e.target.offsetLeft; 
           //y = e.target.offsetTop; 
           
           //alert("x=" + x + " y=" + y);
           //g_ctx3d.cu = x;
           //g_ctx3d.cv = y;
           //Main3D_SetPointsXYZ(g_ctx3d,true,x,y,0);
           Main3D_Draw();
       }
	}
    //-----------------------
    //mouseup event
    //-----------------------
	else
	if (type == 'mouseup')
	{
	}
    //-----------------------
    //mousemove event
    //-----------------------
	else
	if (type == 'mousemove')
	{
       Main3D_GetPoints(g_ctx3d,true,x,y);
       //alert(111);
	}
    //-----------------------
    //mouseover event
    //-----------------------
	else
	if (type == 'mouseover')
	{
       var id = "PointU";
       var e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "lightblue";
	       //e.style.color = "black";
	   }
       id = "PointV";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "lightblue";
	       //e.style.color = "black";
	   }
       id = "PointX";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "lightblue";
	       //e.style.color = "black";
	   }
       id = "PointY";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "lightblue";
	       //e.style.color = "black";
	   }
       id = "PointZ";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "lightblue";
	       //e.style.color = "black";
	   }
       
	}
    //-----------------------
    //mouseout event
    //-----------------------
	else
	if (type == 'mouseout')
	{
       Main3D_GetPoints(g_ctx3d,false,0,0);
       var id = "PointU";
       var e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "white";
	       //e.style.color = "black";
	   }
       id = "PointV";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "white";
	       //e.style.color = "black";
	   }
       id = "PointX";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "white";
	       //e.style.color = "black";
	   }
       id = "PointY";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "white";
	       //e.style.color = "black";
	   }
       id = "PointZ";
       e = document.getElementById(id);
	   if (e)
	   {
	       e.style.backgroundColor = "white";
	       //e.style.color = "black";
	   }
	}
    
}
//----------------------------------------------------------------------------
function Main3D_GetAxes(obj)
{    
      //var obj = g_ctx3d;
      var AxesProp     = [ obj.MinX, obj.MaxX, obj.ScaleX,
                           obj.MinY, obj.MaxY, obj.ScaleY,
                           obj.MinZ, obj.MaxZ, obj.ScaleZ,
                           obj.Zoom, 
                           obj.RatioX,obj.RatioY,obj.RatioZ
                         ];
      var AxesPropId   = [ "MinX","MaxX","ScaleX",
                           "MinY","MaxY","ScaleY",
                           "MinZ","MaxZ","ScaleZ",
                           "Zoom","RatioX","RatioY","RatioZ"                           
                         ];
      var i;
      for (i=0; i < 13; i++)
      {
          e = document.getElementById( AxesPropId[i] );
          //alert(e);
          if (e)
          {
              var num = parseFloat( AxesProp[i] );
              num = Math.round(num*100)/100;
              e.value = "" + num;
          }
      }


}
//----------------------------------------------------------------------------
function Main3D_SetAxes(obj)
{    
      //var obj = g_ctx3d;
      var AxesProp     = [ obj.MinX, obj.MaxX, obj.ScaleX,
                           obj.MinY, obj.MaxY, obj.ScaleY,
                           obj.MinZ, obj.MaxZ, obj.ScaleZ,
                           obj.Zoom

                         ];
      var AxesPropId   = [ "MinX","MaxX","ScaleX",
                           "MinY","MaxY","ScaleY",
                           "MinZ","MaxZ","ScaleZ",
                           "Zoom"
                         ];
      var num = [0,0,0, 0,0,0, 0,0,0, 0];
      var isSet = true;
      var i;
      for (i=0; i < 10; i++)
      {
          e = document.getElementById( AxesPropId[i] );
          //alert(e);
          if (e)
          {
              num[i] = parseFloat(e.value);
              if (isNaN(num[i]))
              {
                isSet = false;
                e.style.backgroundColor = "red"; 
	            e.style.color = "white";
              }
              else
              {
                e.style.backgroundColor = "white"; 
	            e.style.color = "black";
              }
          }
      }
      if (isSet)
      {
          obj.SetAxes( num[0],num[1],num[2],
                       num[3],num[4],num[5],
                       num[6],num[7],num[8] ); 
      }

}
//----------------------------------------------------------------------------
function Main3D_ClearAxes()
{
      //var obj = g_ctx3d;
      var AxesPropId   = [ "MinX","MaxX","ScaleX",
                           "MinY","MaxY","ScaleY",
                           "MinZ","MaxZ","ScaleZ",
                           
                         ];
      var i;
      for (i=0; i < 9; i++)
      {
          e = document.getElementById( AxesPropId[i] );
          if (e)
          {
              e.value = "";
          }
      }

}
//----------------------------------------------------------------------------
function Main3D_GetAngles(obj)
{    
      //var obj = g_ctx3d;
      var AngleProp     = [ obj.AngleX, obj.AngleY, obj.AngleZ ];
      var AnglePropId   = [ "AngleX","AngleY","AngleZ" ] ;
      var i;
      for (i=0; i < 3; i++)
      {
          e = document.getElementById( AnglePropId[i] );
          //alert(e);
          if (e)
          {
              var num = parseFloat( AngleProp[i] );
              num = Math.round(num*100)/100;
              e.value = "" + num;
          }
      }
}
//----------------------------------------------------------------------------
function Main3D_SetAngles(obj)
{    
      //var obj = g_ctx3d;
      var AnglePropId   = [ "AngleX","AngleY","AngleZ" ] ;
      var num = [0,0,0]; //angles x,y,z
      var isSet = true;
      var i;
      for (i=0; i < 3; i++)
      {
          e = document.getElementById( AnglePropId[i] );
          if (e)
          {
              num[i] = parseFloat(e.value);
              if (isNaN(num[i]))
              {
                isSet = false;
                e.style.backgroundColor = "red"; 
	            e.style.color = "white";
              }
              else
              {
                e.style.backgroundColor = "white"; 
	            e.style.color = "black";
              }
          }
      }
      
      if (isSet)
      {
          obj.SetAngleX(num[0]);
          obj.SetAngleY(num[1]);
          obj.SetAngleZ(num[2]);
      }


}
//----------------------------------------------------------------------------
function Main3D_ClearAngles()
{
      //var obj = g_ctx3d;
      var AnglePropId   = [ "AngleX","AngleY","AngleZ" ] ;
      var i;
      var i;
      for (i=0; i < 3; i++)
      {
          e = document.getElementById( AnglePropId[i] );
          if (e)
          {
              e.value = "";
          }
      }

}
//----------------------------------------------------------------------------
function Main3D_GetPoints(obj,isMouse,u,v)
{    
      var uv = [0,0];
      var m = [0,0,0];  //m=move x,y,z
      if (isMouse)
      {
          uv[0] = u;
          uv[1] = v;
          
          m = obj.Point2DtoXYZ(u,v,g_MoveXYZ[2]);

      }
      else
      {
          uv = obj.Point3Dto2D(g_MoveXYZ[0], g_MoveXYZ[1], g_MoveXYZ[2]);
          m[0] = g_MoveXYZ[0];
          m[1] = g_MoveXYZ[1];
          m[2] = g_MoveXYZ[2];
      }
      if (1)
      {
          var AngleProp     = [ m[0],m[1],m[2], g_ctx3d.width, g_ctx3d.height, uv[0],uv[1], obj.cu, obj.cv ];
          var AnglePropId   = [ "PointX","PointY","PointZ","Width","Height", "PointU","PointV","CenterU","CenterV" ] ;
          var i;
          for (i=0; i < 9; i++)
          {
              e = document.getElementById( AnglePropId[i] );
              //alert(e);
              if (e)
              {
                  var num = parseFloat( AngleProp[i] );
                  num = Math.round(num*100)/100;
                  e.value = "" + num;
              }
          }
      }
}
//----------------------------------------------------------------------------
function Main3D_SetPointsXYZ(obj,isMouse,x,y,z)
{    
      //var obj = g_ctx3d;
      var PropId   = [ "PointX","PointY","PointZ" ] ;
      var Mouse = [x,y,z];
      var num = [0,0,0]; //angles x,y,z
      var isSet = true;
      var i;
      for (i=0; i < 3; i++)
      {
          e = document.getElementById( PropId[i] );
          if (e)
          {
              if (isMouse) 
                num[i] = Mouse[i];
              else
                num[i] = parseFloat(e.value);
              if (isNaN(num[i]))
              {
                isSet = false;
                e.style.backgroundColor = "red"; 
	            e.style.color = "white";
              }
              else
              {
                e.style.backgroundColor = "white"; 
	            e.style.color = "black";
              }
          }
      }
      
      if (isSet)
      {
          g_MoveXYZ[0] = num[0];
          g_MoveXYZ[1] = num[1];
          g_MoveXYZ[2] = num[2];
      }

}
//----------------------------------------------------------------------------
function Main3D_GetStepUV()
{    
      var step = 0;
      if (1)
      {
          var id = "StepUV";
          var e = document.getElementById( id );
          if (e)
          {
              step = parseFloat( e.value );
          }
      }
      return step;
}
//----------------------------------------------------------------------------
function Main3D_GetStepXYZ()
{    
      var step = 0;
      if (1)
      {
          var id = "StepXYZ";
          var e = document.getElementById( id );
          if (e)
          {
              step = parseFloat( e.value );
          }
      }
      return step;
}
//----------------------------------------------------------------------------
function Main3D_InvertColors()
{
    var x = 0;
    var y = 0;    
    var canvas = g_ctx3d.canvas;
    var ctx = g_ctx3d.ctx;
    var imgd = ctx.getImageData(x, y, canvas.width, canvas.height);
    var pix = imgd.data;
    var n = pix.length;

    // Loop over each pixel and invert the color.
    for (var i=0; i < n; i += 4) 
    {   
        //pix[i+3] = 55;
        if (1)
        {
            pix[i+0] = 255 - pix[i  ]; // red
            pix[i+1] = 255 - pix[i+1]; // green
            pix[i+2] = 255 - pix[i+2]; // blue
            //pix[i+3] is alpha (the fourth element)  //255=no transparancy
        }
    }

    // Draw the ImageData at the given (x,y) coordinates.
    ctx.putImageData(imgd, x, y);
}
//----------------------------------------------------------------------------
function Main3D_SetObject3D(e)
{    
      //var obj = g_ctx3d;
      var PropId   = [ "SelectObject3D","SelectSides",
                       "SelectColorOutline","SelectColorTypeOutline",
                       "SelectColorFill","SelectColorTypeFill" ] ;
      var value = [0,0,0,0,0,0]; 
      var isSet = true;
      var i;
      for (i=0; i < 6; i++)
      {
          e = document.getElementById( PropId[i] );
          if (e)
          {
              var ee = e[e.selectedIndex];
              value[i] = ee.value;
              //alert(ee);
          }
      }
      
      if (isSet)
      {
           //object name
    	   g_Object3D = value[0]; 

           //object sides
   	       var Sides = parseInt(value[1]);
           g_Object3D_Sides = Sides;
           
           //object color outline
           g_Object3D_ColorOutline = value[2];

           //object color type outline
           //g_Object3D_ColorOutline = value[3];
          
           //object color fill
           if (value[5] == "fill")         
             g_Object3D_ColorFill = value[4];
           else
           if (value[5] == "nofill")         
             g_Object3D_ColorFill = "nofill";
      
      }

}
//----------------------------------------------------------------------------
function Main3D_SelectColorInit()
{    
      //draw background color on option line
      if (1)
      {
          var PropId   = [ "SelectColorOutline", "SelectColorFill" ];
          var j;
          for (j=0; j < 2; j++)
          {
              var id = PropId[j];
              var e = document.getElementById( id );
              if (e)
              {
                  var color;
                  var n = e.length;
                  for (var i=0; i < n; i++)
                  {
                     var bgColor = e[i].value;
                     e[i].style.backgroundColor = bgColor;
                     //alert( e.selectedIndex );
                  }
                  e.style.backgroundColor = e[e.selectedIndex].value;
                  e.style.color = Main3D_GetTextColor(bgColor);
              }
          }
      }
}
//----------------------------------------------------------------------------
function Main3D_GetTextColor(bgColor)
{
   var color = "white";
   if (bgColor == "white")
     color = "black";
   else
   if (bgColor == "yellow")
     color = "black";
   return color;   
}
//----------------------------------------------------------------------------
function Main3D_SelectColor(e)
{    
      //draw background color on option line
      var step = 0;
      if (e)
      {
          var bgColor = e[e.selectedIndex].value;
          e.style.backgroundColor = bgColor;
          e.style.color = Main3D_GetTextColor(bgColor);
      }
}
//----------------------------------------------------------------------------
function Main3D_SetCanvas(canvas)
{
    if (canvas)
    {
      //var obj = g_ctx3d;
      var PropId   = [ "Width","Height" ] ;
      var num = [0,0]; 
      var isSet = true;
      var i;
      for (i=0; i < 2; i++)
      {
          e = document.getElementById( PropId[i] );
          if (e)
          {
              num[i] = parseFloat(e.value);
              if (isNaN(num[i]))
              {
                isSet = false;
                e.style.backgroundColor = "red"; 
	            e.style.color = "white";
              }
              else
              {
                e.style.backgroundColor = "white"; 
	            e.style.color = "black";
              }
          }
      }
      
      if (isSet)
      {
          canvas.width = num[0];
          canvas.height = num[1];
          g_ctx3d.width = num[0];
          g_ctx3d.height = num[1];          
      }
    }
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
