import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Ball } from "./sprites/Ball";
import { CanvasView } from "./view/CanvasView";
import { Obstacle } from "./sprites/obstacle";

export class Collision {

    isCollidingBrick(ball: Ball, brick: Brick): boolean {
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.height > brick.pos.y
        ) {
            return true;
        }
        return false;
    }
    isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
        let colliding = false;

        bricks.forEach((brick, i) => {
            if (this.isCollidingBrick(ball, brick)) {
                ball.changeYDirection();

                if (brick.energy === 1) {
                    bricks.splice(i, 1);
                }
                else {
                    brick.energy -= 1;
                }
                colliding = true;
            }
        });
        return colliding;
    }

    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        if (
            ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y
        ) {
            ball.changeYDirection();
        }
        if (
            ball.pos.x > view.canvas.width - ball.width ||
            ball.pos.x < 0
        ) {
            ball.changeXDirection();
        }

        if (ball.pos.y < 0) {
            ball.changeYDirection();
        }
    }
    isCollidingObstacle(ball: Ball, obs: Obstacle): boolean {
        if (
            ball.pos.x < obs.pos.x + obs.width &&
            ball.pos.x + ball.width > obs.pos.x &&
            ball.pos.y < obs.pos.y + obs.height &&
            ball.pos.y + ball.height > obs.pos.y
        ) {
            ball.changeYDirection();
            return true;
        }
        return false;
    }
    checkObstacleCollision(obs: Obstacle, view: CanvasView): void {
        if (
            obs.pos.x > view.canvas.width - obs.width ||
            obs.pos.x < 0
        ) {
            obs.changeXDirection();
        }

        if (obs.pos.y < 0) {
            obs.changeXDirection();
        }
    }
}