type TValue = number;

const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => {
    return t * (2 - t);
  },
} as const;

export class Interpolator {
  private startTime = Date.now();
  private endTime = Date.now();

  private duration = 3000;

  constructor(private readonly easing: keyof typeof easingFunctions) {}

  inProcess(currentTime: number): boolean {
    return currentTime >= this.startTime && currentTime < this.endTime;
  }

  completed(currentTime: number): boolean {
    return currentTime >= this.endTime;
  }

  fromTo(from: TValue, to: TValue, currentTime: number): TValue {
    if (currentTime < this.startTime) {
      return from;
    }

    if (currentTime >= this.endTime) {
      return to;
    }

    const t = (currentTime - this.startTime) / this.duration;

    return this.apply(from, to, easingFunctions[this.easing](t));
  }

  init(startTime: number, endTime: number): void {
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = endTime - startTime;
  }

  private apply(startValue: TValue, endValue: TValue, t: number): TValue {
    return startValue * (1 - t) + endValue * t;
  }
}
