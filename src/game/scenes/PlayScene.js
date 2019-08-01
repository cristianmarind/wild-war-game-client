import { Scene } from 'phaser'
import { EventBus } from '@/event-bus.js';
import conection from '@/game/conection';

var players;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

export default class PlayScene extends Scene {
    constructor() {
        super({ key: 'PlayScene' })
        this.id = null
        this.serverId = -1
        this.aux = ''
        this.players = {}
        
        //this.data es la data que el evento envie
        EventBus.$on('initialEvent', data => {
            this.serverId = data.serverId
            this.data = data
            this.aux = 'initialEvent'
            this.update()
        });
        EventBus.$on('newPlayer', data => {
            this.data = data
            this.aux = 'newPlayer'
        });
        EventBus.$on('playerDisconnect', data => {
            this.data = data
            this.aux = 'playerDisconnect'
        });
        EventBus.$on('refreshStars', data => {
            this.data = data
            this.aux = 'refreshStars'
        });
        EventBus.$on('collectAllStars', data => {
            this.data = data
            this.aux = 'collectAllStars'
        });
        EventBus.$on('refreshPlayer', data => {
            this.data = data
            this.aux = 'refreshPlayer'
        });
        EventBus.$on('refreshPositionPlayer', data => {
            this.data = data
            this.aux = 'refreshPositionPlayer'
        });
        EventBus.$on('loserPlayer', data => {
            this.data = data
            this.aux = 'loserPlayer'
        });
    }

    create() {

        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        bombs = this.physics.add.group();
        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
    }

    update() {
        let _self = this
        if (this.serverId == -1 || gameOver) {
            return
        }
        switch (this.aux) {
            case 'initialEvent':
                this.players = {}
                this.id = this.data.id
                for (const key in this.data.players) {
                    this.createPlayer(this.data.players[key])
                }
                let auxInterval = setInterval(function () {
                    if (gameOver) {
                        clearInterval(auxInterval)
                    }
                    _self.emitMyPosition()
                }, 5000)
                break;
            case 'newPlayer':
                this.createPlayer(this.data.player)
                break;
            case 'playerDisconnect':
                this.players[this.data.id].object.destroy()
                this.players[this.data.id] = {}
                break;
            case 'refreshPlayer':
                if (this.players[this.data.id]) {
                    this.players[this.data.id].left = this.data.left
                    this.players[this.data.id].right = this.data.right
                    this.players[this.data.id].up = this.data.up
                }
                break;
            case 'refreshPositionPlayer':
                if (this.players[this.data.id]) {
                    this.players[this.data.id].object.x = this.data.posX
                    this.players[this.data.id].object.y = this.data.posY
                    
                }
                break;
            case 'refreshStars':
                if (this.data.positionXStar) {
                    stars.children.entries.map(function(item){
                        if (item.x == _self.data.positionXStar) {
                            item.disableBody(true, true);
                        }
                    })
                }
                break;  
            case 'collectAllStars':
                //borra todas
                stars.children.entries.map(function(item){
                    item.disableBody(true, true);
                })
                //crea todas
                stars.children.iterate(function (child) {
            
                    child.enableBody(true, child.x, 0, true, true);
        
                });
        
                var x = this.data.x;
        
                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(this.data.velocity, 20);
                bomb.allowGravity = false;
                break;        
            case 'loserPlayer':
                this.players[this.data.playerId].object.disableBody(true, true);
                if (this.data.playerId ==  this.id) {
                    gameOver = true
                    alert('Perdiste, no entres de nuevo para que no me dañes el ejercicio :D  :,v')
                    location.reload();
                }
                break;     
            default:
                break;
        }
        //reseat variables
        this.data = null
        this.aux = ''

        //Move the players
        for (const key in this.players) {
            if (this.players[key] != undefined) {
                if (this.players[key].left) {
                    this.movePlayerToTheLeft(this.players[key].id)
                }
                else if (this.players[key].right) {
                    this.movePlayerToTheRight(this.players[key].id)
                }
                else {
                    this.movePlayerToTheTurn(this.players[key].id)
                }
                if (this.players[key].up) {
                    this.movePlayerToTheUp(this.players[key].id)
                }
            }
            
        }

        /*if (gameOver)
        {
            return;
        }*/
        //Emit event for move the player\
        if (cursors.left.isDown && !this.players[this.id].left) {
            this.emitMovePlayerToTheLeft(this.id)
        } else if (!cursors.left.isDown && this.players[this.id].left) {
            this.emitStopPlayerToTheLeft()
        }
        if (cursors.right.isDown && !this.players[this.id].right) {
            this.emitMovePlayerToTheRight(this.id)
        } else if (!cursors.right.isDown && this.players[this.id].right) {
            this.emitStopPlayerToTheRight()
        }
        if (cursors.up.isDown /*&& this.players[this.id].object.body.touching.down*/ && !this.players[this.id].up) {
            this.emitMovePlayerToUp(this.id)
        } else if (!cursors.up.isDown && this.players[this.id].up) {
            this.emitStopPlayerToUp(this.id)
        }

    }

    collectStar(playerId) {
        return function(player, star){
            if (playerId ==  this.id) {
                star.disableBody(true, true);
                this.emitCollectStar(star.x)
                if (stars.countActive(true) === 0)
                {
                    this.emitCollectAllStars()
                }
            }
        }
    }

    hitBomb(playerId) {
        return function(player, bomb){
            if (playerId ==  this.id) {
                this.emitLoserPlayer()
            }
        }
    }

    createPlayer(player) {
        let p = this.physics.add.sprite(player.posX, player.posY, 'dude');
        p.setBounce(0.2);
        p.setCollideWorldBounds(true);
        for (const key in this.players) {
            this.physics.add.collider(p, this.players[key].object);
        }
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(p, platforms);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(p, stars, this.collectStar(player.id), null, this);

        this.physics.add.collider(p, bombs, this.hitBomb(player.id), null, this);
        this.players[player.id] = {
            id: player.id,
            object: p,
            left: player.left,
            right: player.right,
            up: player.up
        }
    }

    movePlayerToTheLeft(playerId) {
        if (!this.players[playerId]) {
            return
        }
        if (!this.players[playerId].object) {
            return
        }
        this.players[playerId].object.setVelocityX(-160);
        this.players[playerId].object.anims.play('left', true);
    }

    movePlayerToTheRight(playerId) {
        if (!this.players[playerId]) {
            return
        }
        if (!this.players[playerId].object) {
            return
        }
        this.players[playerId].object.setVelocityX(160);
        this.players[playerId].object.anims.play('right', true);
    }

    movePlayerToTheTurn(playerId) {
        if (!this.players[playerId]) {
            return
        }
        if (!this.players[playerId].object) {
            return
        }
        this.players[playerId].object.setVelocityX(0);
        this.players[playerId].object.anims.play('turn');
    }

    movePlayerToTheUp(playerId) {
        if (!this.players[playerId]) {
            return
        }
        if (!this.players[playerId].object) {
            return
        }
        this.players[playerId].object.setVelocityY(-330);
    }

    emitMovePlayerToTheLeft() {
        conection.emitMovePlayerToTheLeft(this.id, this.serverId)
    }

    emitMovePlayerToTheRight() {
        conection.emitMovePlayerToTheRight(this.id, this.serverId)
    }

    emitMovePlayerToUp() {
        conection.emitMovePlayerToUp(this.id, this.serverId)
    }

    emitStopPlayerToTheLeft() {
        conection.emitStopPlayerToTheLeft(this.id, this.serverId)
    }

    emitStopPlayerToTheRight() {
        conection.emitStopPlayerToTheRight(this.id, this.serverId)
    }

    emitCollectStar(positionXStar) {
        conection.emitCollectStar(this.serverId, positionXStar)
    }

    emitCollectAllStars() {
        conection.emitCollectAllStars(this.serverId)
    }

    emitStopPlayerToUp() {
        conection.emitStopPlayerToUp(this.id, this.serverId)
    }

    emitMyPosition(){
        conection.emitMyPosition(this.id, this.serverId, this.players[this.id].object.x, this.players[this.id].object.y)
    }

    emitLoserPlayer(){
        conection.emitLoserPlayer(this.id, this.serverId)
    }
}
