// Start here
import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Obstacle } from './sprites/obstacle';
import { Collision } from './Collision';

import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
import OBSTACLE_IMAGE from './images/obstacle.png';

import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY,
    OBSTACLE_SPEED,
    OBSTACLE_WIDTH,
    OBSTACLE_HEIGHT,
    OBSTACLE_STARTX,
    OBSTACLE_STARTY
} from './config';

import { createBricks } from './helpers'

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!');
    gameOver = false;
}
function setGameWin(view: CanvasView) {
    view.drawInfo('You win');
    gameOver = false;
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision,
    obstacle: Obstacle
) {
    console.log('draw!');
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(obstacle);
    view.drawSprite(ball);
    // Move Ball
    ball.moveBall();
    obstacle.moveObstacle(); //check if obstacle exit the playField??


    // Move paddle and check so it won't exit the playfield
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle();
    }

    collision.checkBallCollision(ball, paddle, view);
    collision.checkObstacleCollision(obstacle, view);
    const collidingBrick = collision.isCollidingBricks(ball, bricks);
    collision.isCollidingObstacle(ball, obstacle);

    if (collidingBrick) {
        score += 1;
        view.drawScore(score);
    }

    // Game Over when ball leaves playField
    if (ball.pos.y > view.canvas.height)
        gameOver = true;
    // If game won, set gameOver and display win
    if (bricks.length === 0) {
        return setGameWin(view);
    }
    // Return if gameover and don't run the requestAnimationFrame
    if (gameOver)
        return setGameOver(view);

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision, obstacle));
}

function startGame(view: CanvasView) {
    // Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    // Create a collision instance
    const collision = new Collision();
    // Create all bricks
    const bricks = createBricks();
    // Create a Ball
    const ball = new Ball(
        BALL_SPEED,
        BALL_SIZE,
        { x: BALL_STARTX, y: BALL_STARTY },
        BALL_IMAGE
    );
    // Create a Paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    );

    const obstacle = new Obstacle(
        OBSTACLE_WIDTH,
        OBSTACLE_HEIGHT,
        OBSTACLE_SPEED,
        {
            x: OBSTACLE_STARTX,
            y: view.canvas.height - OBSTACLE_HEIGHT - 200
        },
        OBSTACLE_IMAGE
    );

    gameLoop(view, bricks, paddle, ball, collision, obstacle);
}

const view = new CanvasView('#playField');
view.initStartButton(startGame);

