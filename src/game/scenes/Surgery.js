import Phaser, { Scene } from "phaser";
import eventsCenter from "@/game/eventsCenter";
import eventEmitter from "../eventEmitter";
import Player from "@/game/Player";
import {
  resizeMapLayer,
  resizeCollider,
  createMessage,
  nextSceneFunc,
  handleRoomCountdownFinished,
} from "@/game/HelperFunctions";

import collider from "@/game/assets/collider.png";
import bar_of_soap from "@/game/assets/popups/bar_of_soap.png";
import rubber_glove from "@/game/assets/popups/rubber_glove.png";
import scapel from "@/game/assets/popups/scapel.png";

import RoomTimer from "@/game/scenes/RoomTimer";

class Surgery extends Scene {
  constructor() {
    super({ key: "Surgery" });
    this.collectedClues = [];
  }

  preload() {
    Player.preload(this);

    //GURNEYS
    this.load.image("gurney1", collider);
    this.load.image("gurney2", collider);
    this.load.image("gurney3", collider);

    //GAS CANNISTERS
    this.load.image("gasCannister1", collider);
    this.load.image("gasCannister2", collider);
    this.load.image("gasCannister3", collider);

    //SINKS
    this.load.image("sink1", collider);
    this.load.image("sink2", collider);
    this.load.image("sink3", collider);
    this.load.image("sink4", collider);
    this.load.image("sink5", collider);

    //TABLES
    this.load.image("table1", collider);
    this.load.image("table2", collider);

    //POPUPS
    this.load.image("glove", rubber_glove);
    this.load.image("soap", bar_of_soap);
    this.load.image("scapel", scapel);
  }

  create() {
    this.createTitle();
    this.createPlayer();
    this.createMap();
    this.createGurney();
    this.createCannister();
    this.createSink();
    this.createTable();
    this.createColliders();
    this.createTimer();
  }

  createTitle() {
    this.add.text(380, 605, "SURGERY", {
      fontFamily: "GypsyCurse",
      fontSize: 30,
      color: "red",
    });
  }

  createTimer() {
    const roomTimerLabel = this.add.text(10, 610, "", {
      fontSize: 20,
      backgroundColor: "black",
      padding: 5,
    });

    this.roomTimer = new RoomTimer(this, roomTimerLabel);
    this.roomTimer.start(handleRoomCountdownFinished.bind(this));
  }

  createMap() {
    const map = this.make.tilemap({ key: "surgery" });
    const InteriorA = map.addTilesetImage(
      "Interior-Hospital-A",
      "Interior-A",
      16,
      16,
      0,
      0
    );

    const InteriorB = map.addTilesetImage(
      "Interior-Hospital-B",
      "Interior-B",
      16,
      16,
      0,
      0
    );

    const InteriorC = map.addTilesetImage(
      "Interior-Hospital-C",
      "Interior-C",
      16,
      16,
      0,
      0
    );

    const InteriorAlt = map.addTilesetImage(
      "Interior-Hospital-Alt",
      "Interior-Alt",
      16,
      16,
      0,
      0
    );

    //LAYERS
    this.floorLayer = map.createLayer("surgeryFloor", InteriorB);
    this.wallLayer = map.createLayer("surgeryWalls", InteriorA);
    this.backgroundLayer = map.createLayer("surgeryBackground", InteriorAlt);
    this.detailsAltLayer = map.createLayer("surgeryDetailsAlt", InteriorAlt);
    this.detailsCLayer = map.createLayer("surgeryDetailsC", InteriorC);

    //SCALES TILED MAP TO FIT WORLD SIZE
    const layers = [
      this.floorLayer,
      this.wallLayer,
      this.backgroundLayer,
      this.detailsAltLayer,
      this.detailsCLayer,
    ];

    for (let i = 0; i < layers.length; i++) {
      resizeMapLayer(this, layers[i]);
      layers[i].setDepth(-1);
    }
  }

  createPlayer() {
    this.player = this.physics.add.existing(
      new Player(this, 350, 300, "player1")
    );

    //ADJUSTS PLAYER SPRITE SIZE
    this.player.displayHeight = 20;
    this.player.displayWidth = 20;

    //ADJUSTS COLLIDER TO SURROUND PLAYER
    this.time.addEvent({
      delay: 100,
      callback: () => resizeCollider(this.player, 20, 20),
      callbackScope: this,
      loop: false,
    });
  }

  createGurney() {
    this.gurney1 = this.physics.add
      .sprite(555, 90, "gurney1")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(85, 35, true);

    this.gurney2 = this.physics.add
      .sprite(690, 400, "gurney2")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(85, 35, true);

    this.gurney3 = this.physics.add
      .sprite(385, 470, "gurney3")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(45, 70, true);
  }

  createCannister() {
    this.cannister1 = this.physics.add
      .sprite(50, 72, "gasCannister1")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(22, 32, true);

    this.cannister2 = this.physics.add
      .sprite(740, 195, "gasCannister2")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(22, 30, true);

    this.cannister3 = this.physics.add
      .sprite(330, 395, "gasCannister3")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(22, 30, true);
  }

  createSink() {
    this.sink1 = this.physics.add
      .sprite(45, 160, "sink1")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(45, 83, true);

    this.sink2 = this.physics.add
      .sprite(260, 130, "sink2")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(30, 94, true);

    this.sink3 = this.physics.add
      .sprite(165, 535, "sink3")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(103, 40, true);

    this.sink4 = this.physics.add
      .sprite(740, 130, "sink4")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(41, 29, true);

    this.sink5 = this.physics.add
      .sprite(740, 460, "sink5")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(41, 29, true);
  }

  createTable() {
    this.table1 = this.physics.add
      .sprite(400, 188, "table1")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(30, 30, true);

    this.table2 = this.physics.add
      .sprite(620, 114, "table2")
      .setOrigin(0, 0)
      .setDepth(-2)
      .setSize(30, 30, true);
  }

  createColliders() {
    //LAYER COLLIDERS
    this.wallLayer.setCollisionByProperty({ collides: true });
    this.detailsAltLayer.setCollisionByProperty({ collides: true });
    this.detailsCLayer.setCollisionByProperty({ collides: true });

    //CREATES INTERACTION BETWEEN PLAYER AND LAYER COLLIDERS
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.detailsAltLayer);
    this.physics.add.collider(this.player, this.detailsCLayer);

    this.physics.add.overlap(
      this.player,
      this.gurney1,
      this.onGurneyCollision,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.cannister1,
      this.onCannisterCollision,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.sink1,
      this.onSinkCollision,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.table1,
      this.onTableCollision,
      null,
      this
    );
  }

  onGurneyCollision() {
    const popUp = this.add.image(400, 300, "glove");
    popUp.setScale(0.5, 0.5);
    this.player.disableBody();
    eventsCenter.emit("update-bank", "glove");
    this.time.addEvent({
      delay: 4750,
      callback: () => popUp.destroy(),
      loop: false,
    });

    if (!this.collectedClues.includes("glove")) {
      this.collectedClues.push("glove");
      this.completed();
    }

    nextSceneFunc(this, "MainScene");
  }

  onCannisterCollision() {
    const cannisterMessage = "Huh, it's a gas cannister. It's heavy.";
    this.player.disableBody();
    createMessage(this, cannisterMessage);

    if (!this.collectedClues.includes("gasCannister")) {
      this.collectedClues.push("gasCannister");
      this.completed();
    }

    nextSceneFunc(this, "MainScene");
  }

  onSinkCollision() {
    const popUp = this.add.image(400, 300, "soap").setScale(0.5, 0.5);
    this.player.disableBody();
    eventsCenter.emit("update-bank", "soap");
    this.time.addEvent({
      delay: 4750,
      callback: () => popUp.destroy(),
      loop: false,
    });

    if (!this.collectedClues.includes("soap")) {
      this.collectedClues.push("soap");
      this.completed();
    }

    nextSceneFunc(this, "MainScene");
  }

  onTableCollision() {
    const popUp = this.add.image(400, 300, "scapel").setScale(0.5, 0.5);
    this.player.disableBody();
    eventsCenter.emit("update-bank", "scapel");
    this.time.addEvent({
      delay: 4750,
      callback: () => popUp.destroy(),
      loop: false,
    });

    if (!this.collectedClues.includes("scapel")) {
      this.collectedClues.push("scapel");
      this.completed();
    }

    nextSceneFunc(this, "MainScene");
  }

  update() {
    this.player.update();
    this.roomTimer.update();
  }

  completed() {
    if (this.collectedClues.length === 4)
      //send a message to dice to lower prob of the surgery (index 1) being rolled
      eventEmitter.emit("completed", 1);
  }
}

export default Surgery;
