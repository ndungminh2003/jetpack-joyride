import { mapGenerator } from "../../manager/MapGenerator";
import { Player } from "../../objects/player/Player";
import { NormalWorker } from "../../objects/worker/NormalWorker";
import { YellowWorker } from "../../objects/worker/YellowWorker";
import { Zapper } from "../../objects/obstacle/zapper/Zapper";
import { Missile } from "../../objects/obstacle/missile/Missile";

export class MainGame extends Phaser.GameObjects.Container {
  private player: Player;
  private obstacleGroup: Phaser.GameObjects.Group;
  private workerGroup: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    this.create();
    this.setDepth(Infinity);
  }

  public create() {
    this.scene.physics.world.enable(this);

    // Create player
    this.player = new Player(this.scene, 100, 550);

    // Create map and set up world bounds
    mapGenerator.generateMap(
      mapGenerator.getMapName(0),
      this.scene,
      this.player
    );
    mapGenerator.parallex(this.scene);
    this.scene.physics.world.setBounds(
      0,
      0,
      Infinity,
      mapGenerator.getMap().heightInPixels
    );

    // Set up player collisions with ground
    this.scene.physics.add.collider(this.player, mapGenerator.getGround());
    this.scene.physics.add.collider(
      this.player.getBullets(),
      mapGenerator.getGround(),
      (bullet, _) => {
        this.player
          .getBullets()
          .handleBulletCollideWithGround(bullet as Phaser.Physics.Arcade.Image);
      }
    );

    // Handle world bounds events
    this.scene.physics.world.on("worldbounds", (body: any) => {
      body.gameObject.onWorldBounds();
    });

    // Set up camera to follow player
    this.scene.cameras.main.startFollow(this.player, true, 0.5, 0.5);
    this.scene.cameras.main.setBounds(
      0,
      0,
      Infinity,
      mapGenerator.getMap().heightInPixels
    );

    // Set player and bullet depths
    this.player.setDepth(Infinity);
    this.player.getBullets().setDepth(Infinity);

    // Add this container to the scene
    this.scene.add.existing(this);

    // Initialize obstacle group
    this.obstacleGroup = this.scene.add.group();

    // Initialize worker group
    this.workerGroup = this.scene.add.group();

    // Timed generation of obstacles and workers
    this.scene.time.addEvent({
      delay: 2000, // 2 seconds
      callback: this.generateObstacle,
      callbackScope: this,
      loop: true,
    });

    this.scene.time.addEvent({
      delay: 2000, // 2 seconds
      callback: this.generateWorker,
      callbackScope: this,
      loop: true,
    });
  }


  update(time: number, delta: number) {
    // Update player and map generator
    this.player.update(time, delta);
    mapGenerator.update(this.player, this.scene);

    const cameraX = this.scene.cameras.main.scrollX;

    // Update and destroy obstacles that are out of view
    this.obstacleGroup.getChildren().forEach((child: any) => {
      if (child.active && child.update) {
        child.update();
      }
      if (child.x < cameraX - 400) {
        // 50 pixels buffer
        child.destroy();
      }
    });

    // Update and destroy workers that are out of view
    this.workerGroup.getChildren().forEach((child: any) => {
      if (child.active && child.update) {
        child.update();
      }
      if (child.x < cameraX - 400) {
        child.destroy();
      }
    });
  }

  private generateObstacle() {
    const obstacleTypes = ["Zapper", "Missile"];
    const type = Phaser.Math.RND.pick(obstacleTypes);

    let obstacle;

    switch (type) {
      case "Zapper":
        const zapperX =
          this.scene.cameras.main.scrollX + this.scene.cameras.main.width + 50;
        const zapperY = Phaser.Math.Between(200, this.scene.scale.height - 300);

        obstacle = new Zapper(this.scene, zapperX, zapperY);
        this.obstacleGroup.add(obstacle);
        break;
      case "Missile":
        const missileX =
          this.scene.cameras.main.scrollX + this.scene.cameras.main.width - 50;
        const missileY = this.player.y + this.player.body.height / 4;
        obstacle = new Missile(
          this.scene,
          missileX,
          missileY,
          this.player.body.velocity.x
        );
        this.obstacleGroup.add(obstacle);
        break;
      default:
        console.warn("Unknown obstacle type:", type);
        break;
    }

    if (obstacle) {
      obstacle.addCollide(this.player);
      this.scene.add.existing(obstacle);
    }
  }

  private generateWorker() {
    const numNormalWorkers = 1;
    const numYellowWorkers = 2;

    // Generate NormalWorkers
    for (let i = 0; i < numNormalWorkers; i++) {
      const xWorker =
        this.scene.cameras.main.scrollX +
        this.scene.cameras.main.width +
        Phaser.Math.Between(0, 800);
      const yWorker = 600;
      const action = Phaser.Math.RND.pick(["walk", "run"]); // Random action
      const flipX = Phaser.Math.RND.between(0, 1) === 1; // Random flipX for this worker
      const worker = new NormalWorker(this.scene, action, xWorker, yWorker);
      worker.setFlipX(flipX); // Set flipX
      
      // Set up collisions
      this.scene.physics.add.collider(worker, mapGenerator.getGround());
      this.scene.physics.add.collider(this.player.getBullets(), worker, () => {
        worker.handleCollide();
      });

      this.scene.physics.add.collider(
        worker,
        this.player.getBullets(),
        (bullet, _) => {
          this.player
            .getBullets()
            .handleBulletCollideWithGround(bullet as Phaser.Physics.Arcade.Image);
        }
      );
      
      // Add worker to group and scene
      this.workerGroup.add(worker);
      this.scene.add.existing(worker);

    }

    // Generate YellowWorkers
    for (let i = 0; i < numYellowWorkers; i++) {
      const xWorkerYellow =
        this.scene.cameras.main.scrollX +
        this.scene.cameras.main.width +
        Phaser.Math.Between(0, 800);
      const yWorkerYellow = 600;
      const action = Phaser.Math.RND.pick(["walk", "run"]); // Random action
      const flipX = Phaser.Math.RND.between(0, 1) === 1; // Random flipX for this worker
      const worker = new YellowWorker(
        this.scene,
        action,
        xWorkerYellow,
        yWorkerYellow
      );
      worker.setFlipX(flipX); // Set flipX
      
      // Set up collisions
      this.scene.physics.add.collider(worker, mapGenerator.getGround());
      this.scene.physics.add.collider(this.player.getBullets(), worker, () => {
        worker.handleCollide();
      });

      this.scene.physics.add.collider(
        worker,
        this.player.getBullets(),
        (bullet, _) => {
          this.player
            .getBullets()
            .handleBulletCollideWithGround(bullet as Phaser.Physics.Arcade.Image);
        }
      );
      // Add worker to group and scene
      this.workerGroup.add(worker);
      this.scene.add.existing(worker);

      
    }
  }
}
