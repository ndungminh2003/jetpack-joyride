export class MusicManager {
    private static instance: MusicManager
    private bgm: Phaser.Sound.BaseSound
    private jetpackFire: Phaser.Sound.BaseSound
    private runSound: Phaser.Sound.BaseSound[] = []
    private currentRunSoundIndex: number = 0

    private explosion: Phaser.Sound.BaseSound
    private missileLaunch: Phaser.Sound.BaseSound
    private missileWarning: Phaser.Sound.BaseSound
    private dieBones: Phaser.Sound.BaseSound

    public static getInstance(scene: Phaser.Scene): MusicManager {
        if (!MusicManager.instance) {
            MusicManager.instance = new MusicManager(scene)
        }
        return MusicManager.instance
    }

    private constructor(scene: Phaser.Scene) {
        this.bgm = scene.sound.add('musicLevel', { loop: true, volume: 0.5 })
        this.jetpackFire = scene.sound.add('jetpackFire', { loop: true, volume: 0.5 })
        this.runSound.push(scene.sound.add('run1', { loop: false, volume: 0.5 }))
        this.runSound.push(scene.sound.add('run2', { loop: false, volume: 0.5 }))
        this.runSound.push(scene.sound.add('run3', { loop: false, volume: 0.5 }))
        this.runSound.push(scene.sound.add('run4', { loop: false, volume: 0.5 }))

        this.explosion = scene.sound.add('rocketExplosion', { loop: false, volume: 0.5 })
        this.missileLaunch = scene.sound.add('missileLaunch', { loop: false, volume: 0.5 })
        this.missileWarning = scene.sound.add('missileWarning', { loop: false, volume: 0.5 })
        this.dieBones = scene.sound.add('dieBones', { loop: false, volume: 0.5 })
    }

    public playBGM(): void {
        this.bgm.play()
    }

    public playJetpackFire(): void {
        if (!this.jetpackFire.isPlaying) {
            this.jetpackFire.play()
        }
    }

    public playExplosion(): void {
        if (!this.explosion.isPlaying) {
            this.explosion.play()
        }
    }

    public playMissileLaunch(): void {
        if (!this.missileLaunch.isPlaying) {
            this.missileLaunch.play()
        }
    }

    public playMissileWarning(): void {
        if (!this.missileWarning.isPlaying) {
            this.missileWarning.play()
        }
    }

    public playDieBones(): void {
        if (!this.dieBones.isPlaying) {
            this.dieBones.play()
        }
    }

    public playRunSound(): void {
        if (!this.runSound[this.currentRunSoundIndex].isPlaying) {
            this.runSound[this.currentRunSoundIndex].play()
            this.currentRunSoundIndex = (this.currentRunSoundIndex + 1) % this.runSound.length
        }
    }

    public stopRunSound(): void {
        this.runSound.forEach((sound) => {
            if (sound.isPlaying) {
                sound.stop()
            }
        })
    }

    public stopJetpackFire(): void {
        if (this.jetpackFire.isPlaying) {
            this.jetpackFire.stop()
        }
    }

    public stopBGM(): void {
        if (this.bgm.isPlaying) {
            this.bgm.stop()
        }
    }
}
