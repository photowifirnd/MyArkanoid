import { Vector } from "~/types";

export class Obstacle {
    private obsWidth: number;
    private obsHeight: number;
    private speed: Vector;
    private position: Vector;
    private obsImage: HTMLImageElement = new Image();

    constructor(
        obstacleWidth: number,
        obstacleHeight: number,
        obstacleSpeed: number,
        obstaclePosition: Vector,
        image: string
    ) {
        this.obsWidth = obstacleWidth;
        this.obsHeight = obstacleHeight;
        this.speed = {
            x: obstacleSpeed,
            y: obstacleSpeed
        }
        this.position = obstaclePosition;
        this.image.src = image;
    }

    get width(): number {
        return this.obsWidth;
    }
    get height(): number {
        return this.obsHeight;
    }
    get pos(): Vector {
        return this.position;
    }
    get image(): HTMLImageElement {
        return this.obsImage;
    }

    changeXDirection(): void {
        this.speed.x = -this.speed.x;
    }

    moveObstacle(): void {
        this.pos.x -= this.speed.x;
    }
}