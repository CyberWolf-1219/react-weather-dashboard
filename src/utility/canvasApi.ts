export default class FrequencyVisualizer {
  canvas: HTMLCanvasElement;
  barCount: number;
  ctx: CanvasRenderingContext2D;

  circumference: number;
  circleRadius: number;

  rotateAngle: number;
  constructor(canvas: HTMLCanvasElement, barCount: number) {
    this.canvas = canvas;
    this.canvas.width = 500;
    this.canvas.height = 500;

    this.barCount = barCount;

    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    this.circumference = 0;
    this.circleRadius = 0;
    this.rotateAngle = 0.0789;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  calculateCircumference(barWidth: number) {
    this.circumference = this.barCount * (barWidth + 2);
    console.log(this.circumference);
  }
  calculateRadius() {
    this.circleRadius = this.circumference / (2 * Math.PI);
    console.log(this.circleRadius);
  }

  draw(array: Uint8Array) {
    this.clear();
    array.forEach((val, index) => {
      this.ctx.strokeStyle = `rgb(255,255,255)`;
      this.ctx.beginPath();
      this.ctx.moveTo(this.circleRadius, 0);
      this.ctx.lineTo(val <= this.circleRadius ? this.circleRadius : val, 0);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.rotate(this.rotateAngle);
    });
  }
}
