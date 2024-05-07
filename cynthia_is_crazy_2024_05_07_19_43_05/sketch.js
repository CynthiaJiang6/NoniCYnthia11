let mode = 0;
let mic, fft;
let bubbles = [];

function setup() {

   createCanvas(windowWidth, windowHeight, );
   frameRate(10);
   splash = new Splash();
   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);

}

function draw() {
   if (mouseIsPressed == true) {
      mode = 1;
   }
   if (mode == 1) {
      splash.hide();
      drawSea();
      drawWaves();
      drawSun(width / 5, height / 5, 90);
      drawBubbles();

      let spectrum = fft.analyze();
      let peakFrequency = findPeakFrequency(spectrum);
      console.log(peakFrequency);
      if (peakFrequency > 700 && peakFrequency < 1500) {
         drawBird(random(width / 50, width), random(height / 10, height / 3));
      }
      if (peakFrequency > 300 && peakFrequency < 700) {
         drawFishShape(random(width / 80, width), random(height * 0.7, height));
      }
      if (peakFrequency > 85 && peakFrequency < 300) {
         drawCloud(random(width / 40, width),
            random(height / 40, height / 3),
            random(100, 120), random(100, 150))
      }
   }
}

function findPeakFrequency(spectrum) {
   let peakAmplitude = 0;
   let peakFrequency = 0;

   for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > peakAmplitude) {
         peakAmplitude = spectrum[i];
         peakFrequency = i;
      }
   }

   // Convert index to frequency
   peakFrequency = map(peakFrequency, 0, spectrum.length, 0, sampleRate() / 2);

   return peakFrequency;
}

function drawSun(x, y, radius) {
   // Draw the sun body
   fill(255, 204, 0); // Bright yellow color
   stroke(255, 204, 0);
   strokeWeight(2);
   ellipse(x, y, radius * 2, radius * 2);

   // Draw sun rays
   stroke(255, 204, 0);
   strokeWeight(4);
   let numRays = 12;
   let angleStep = TWO_PI / numRays;
   for (let i = 0; i < TWO_PI; i += angleStep) {
      let startX = x + cos(i) * radius;
      let startY = y + sin(i) * radius;
      let endX = x + cos(i) * radius * 1.5;
      let endY = y + sin(i) * radius * 1.5;
      line(startX, startY, endX, endY);
   }
}

function drawBird(x, y) {
   fill(255);
   noStroke();
   ellipse(0, 0, 20, 10); // Draw the body

   // Wings
   stroke(0);
   strokeWeight(2);
   line(0, -5, -20, -25); // Left wing
   line(0, -5, 20, -25); // Right wing

}

function drawWaves() {
   noFill();
   stroke(255); // White color for the waves
   strokeWeight(2);

   // Create smooth, undulating waves
   for (let y = 0; y < height; y += 20) {
      beginShape();
      for (let x = 0; x <= width; x += 20) {
         let angle = (frameCount * 0.2 + x) * 0.04; // Change multiplier for speed and frequency
         let sinValue = sin(angle) * 12; // Change amplitude for wave height
         vertex(x, height * 0.70 + y + sinValue);
      }
      endShape();
   }
}

function drawSea() {
   for (let y = 0; y < height; y++) {
      let seaColor = map(y, 0, height, 280, 188); // Gradient from light to darker blue
      fill(51, 204, seaColor);
      noStroke();
      rect(0, y, width, 1);
   }
}

function drawCloud(x, y, width, height) {
   noStroke();
   let layers = random(10, 40);
   let alphaValue = random(80, 200);

   for (let i = layers; i > 0; i--) {
      let ratio = i / layers;
      fill(255, alphaValue * ratio);
      ellipse(x, y, width * ratio * 0.5, height * ratio * 0.5);
      ellipse(x - random(40, 60) * ratio, y, width * ratio * 0.6, height * ratio * 0.6);
      ellipse(x + random(30, 40) * ratio, y, width * ratio * 0.6, height * ratio * 0.6);
      ellipse(x - random(10, 30) * ratio, y - random(30, 40) * ratio, width * ratio * 0.7, height * ratio * 0.7);
      ellipse(x + random(10, 40) * ratio, y - random(30, 40) * ratio, width * ratio * 0.7, height * ratio * 0.7);
   }
}

function drawFishShape(x, y) {
   fill(255, 200, 0); // Bright yellow-orange fish
   noStroke();
   ellipse(x, y, 20, 10); // Body of the fish
   triangle(x + 10, y, x + 25, y - 5, x + 25, y + 5); // Tail of the fish
}

function drawBubbles() {

   if (random(1) < 0.05) {
      bubbles.push({
         x: random(width),
         y: height,
         r: random(2, 5)
      });
   }

   for (let i = bubbles.length - 1; i >= 0; i--) {
      let bubble = bubbles[i];
      fill(255, 150); // Semi-transparent white
      noStroke();
      ellipse(bubble.x, bubble.y, bubble.r * 2);

      // Update bubble position
      bubble.y -= bubble.r * 0.5; // Speed depends on size
      bubble.x += random(-1, 1); // Slight horizontal movement

      // Remove bubbles that reach the top
      if (bubble.y < height * 0.75) {
         bubbles.splice(i, 1);
      }
   }
}