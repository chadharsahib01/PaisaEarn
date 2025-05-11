class GameAudio {
    constructor() {
        this.backgroundMusic = document.getElementById('background-music');
        this.clickSound = document.getElementById('click-sound');
        this.upgradeSound = document.getElementById('upgrade-sound');
        this.coinSound = document.getElementById('coin-sound');
    }

    playBackgroundMusic() {
        this.backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    playClickSound() {
        this.clickSound.currentTime = 0;
        this.clickSound.play().catch(e => console.log('Audio play failed:', e));
    }

    playUpgradeSound() {
        this.upgradeSound.currentTime = 0;
        this.upgradeSound.play().catch(e => console.log('Audio play failed:', e));
    }

    playCoinSound() {
        this.coinSound.currentTime = 0;
        this.coinSound.play().catch(e => console.log('Audio play failed:', e));
    }

    setMusicVolume(volume) {
        this.backgroundMusic.volume = volume / 100;
    }

    setSFXVolume(volume) {
        this.clickSound.volume = volume / 100;
        this.upgradeSound.volume = volume / 100;
        this.coinSound.volume = volume / 100;
    }
}