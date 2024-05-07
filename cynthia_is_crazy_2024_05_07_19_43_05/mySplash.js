class Splash {

 constructor() {
   
  this.splashBorder = 100;
  fill(255);
  stroke(51,255,255)
  rect(this.splashBorder, this.splashBorder, windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  // draw a rectangle like this in a 3D enviornment
  // rect(this.splashBorder-(windowWidth/2), this.splashBorder-(windowHeight/2), windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  fill(0, 0, 222);
  strokeWeight(3)
   
  line(windowWidth-this.splashBorder-40, this.splashBorder+20,windowWidth-this.splashBorder-20, this.splashBorder+40)
   line(windowWidth-this.splashBorder-20, this.splashBorder+20,windowWidth-this.splashBorder-40, this.splashBorder+40)
   
  this.title = createDiv("Vocal Landscape");
  this.title.style('color:skyblue');
  this.title.style('font-family: Arial, Helvetica, sans-serif');
  this.title.position(this.splashBorder+20, this.splashBorder+20);
  
  this.name = createDiv("Noni Zhang, Cynthia Jiang");
  this.name.position(this.splashBorder+20, this.splashBorder+60);
  
  this.info = createDiv("This is a sound interactive project that allows participants to shape a visual landscape through their voice. By singing or speaking into a microphone, users engage with sound analysis technology that converts vocal inputs into visual elements such as waves, clouds, and birds on a digital canvas. This project offers a unique opportunity for individuals to observe and experience the artistic influence of their voice. <p> <a href=https://editor.p5js.org/bcjacobs/sketches/IhHSvjyZJ>view code</a>");
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(windowWidth-this.splashBorder*2-50, windowHeight-this.splashBorder*2-50)
   

  
}
  
  update(){
       if(mouseX > windowWidth-this.splashBorder-40 && 
          mouseX < windowWidth-this.splashBorder-20 
          && mouseY < this.splashBorder+40 
          && mouseY > this.splashBorder+20
     ){
     return true
   }
  }
 
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
  }
}

