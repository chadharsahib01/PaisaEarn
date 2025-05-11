class EarnPaisaGame {
    constructor() {
        this.state = {
            coins: 0,
            level: 1,
            clickPower: 1,
            clickPowerLevel: 1,
            clickPowerCost: 10,
            autoClickRate: 0,
            autoClickLevel: 0,
            autoClickCost: 50,
            darkMode: false,
            soundOn: true,
            musicVolume: 50,
            sfxVolume: 50
        };
        this.ui = {
            loadingScreen: document.getElementById('loading-screen'),
            onboardingScreen: document.getElementById('onboarding-screen'),
            gameContainer: document.getElementById('game-container'),
            coins: document.getElementById('coins-display'),
            level: document.getElementById('level-display'),
            hamster: document.getElementById('hamster'),
            clickFeedback: document.getElementById('click-feedback'),
            clickValue: document.getElementById('click-value'),
            clickPowerLevel: document.getElementById('click-power-level'),
            clickPowerCost: document.getElementById('click-power-cost'),
            autoClickLevel: document.getElementById('auto-click-level'),
            autoClickCost: document.getElementById('auto-click-cost'),
            autoGeneration: document.getElementById('auto-generation'),
            autoRate: document.getElementById('auto-rate'),
            soundToggle: document.getElementById('sound-toggle'),
            themeToggle: document.getElementById('theme-toggle'),
            menuButton: document.getElementById('menu-button'),
            settingsMenu: document.getElementById('settings-menu'),
            closeSettings: document.getElementById('close-settings'),
            musicVolume: document.getElementById('music-volume'),
            sfxVolume: document.getElementById('sfx-volume'),
            resetProgress: document.getElementById('reset-progress'),
            startButton: document.getElementById('start-button')
        };
        this.upgradeButtons = {
            clickPower: document.getElementById('buy-click-power'),
            autoClick: document.getElementById('buy-auto-click')
        };
        this.audio = new GameAudio();
        this.animations = new GameAnimations();
    }
    init() {
        this.loadGame();
        this.setupEventListeners();
        this.updateUI();
        this.setupAutoClick();
        this.loadAssets();
    }
    setupEventListeners() {
        this.ui.hamster.addEventListener('click', () => this.onHamsterClick());
        this.upgradeButtons.clickPower.addEventListener('click', () => this.upgradeClickPower());
        this.upgradeButtons.autoClick.addEventListener('click', () => this.upgradeAutoClick());
        this.ui.soundToggle.addEventListener('click', () => this.toggleSound());
        this.ui.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.ui.menuButton.addEventListener('click', () => this.toggleSettings());
        this.ui.closeSettings.addEventListener('click', () => this.toggleSettings());
        this.ui.musicVolume.addEventListener('input', (e) => {
            this.state.musicVolume = e.target.value;
            this.audio.setMusicVolume(this.state.musicVolume);
        });
        this.ui.sfxVolume.addEventListener('input', (e) => {
            this.state.sfxVolume = e.target.value;
            this.audio.setSFXVolume(this.state.sfxVolume);
        });
        this.ui.resetProgress.addEventListener('click', () => this.resetGame());
        this.ui.startButton.addEventListener('click', () => this.startGame());
    }
    loadAssets() {
        setTimeout(() => {
            this.ui.loadingScreen.classList.add('hidden');
            this.ui.onboardingScreen.classList.remove('hidden');
            this.applySettings();
        }, 1500);
    }
    startGame() {
        this.ui.onboardingScreen.classList.add('hidden');
        this.ui.gameContainer.classList.remove('hidden');
        this.animations.initHamsterAnimations();
        if (this.state.soundOn) {
            this.audio.playBackgroundMusic();
        }
    }
    applySettings() {
        if (this.state.darkMode) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#ffffff';
            this.ui.themeToggle.classList.remove('light-mode');
            this.ui.themeToggle.classList.add('dark-mode');
        }
        if (!this.state.soundOn) {
            this.ui.soundToggle.classList.remove('sound-on');
            this.ui.soundToggle.classList.add('sound-off');
        }
        this.ui.musicVolume.value = this.state.musicVolume;
        this.ui.sfxVolume.value = this.state.sfxVolume;
        this.audio.setMusicVolume(this.state.musicVolume);
        this.audio.setSFXVolume(this.state.sfxVolume);
        if (this.state.autoClickLevel > 0) {
            this.ui.autoGeneration.classList.remove('hidden');
        }
    }
    onHamsterClick() {
        this.state.coins += this.state.clickPower;
        if (this.state.soundOn) {
            this.audio.playClickSound();
        }
        this.ui.clickValue.textContent = `+${this.state.clickPower}`;
        this.animations.playClickAnimation();
        this.checkForLevelUp();
        this.updateUI();
    }
    setupAutoClick() {
        if (this.state.autoClickRate > 0) {
            setInterval(() => {
                this.state.coins += this.state.autoClickRate;
                this.updateUI();
                this.checkForLevelUp();
            }, 1000);
        }
    }
    checkForLevelUp() {
        const nextLevelCost = this.state.level * 100;
        if (this.state.coins >= nextLevelCost) {
            this.state.level++;
            if (this.state.soundOn) {
                this.audio.playUpgradeSound();
            }
            this.animations.playLevelUpAnimation();
            this.updateUI();
        }
    }
    upgradeClickPower() {
        if (this.state.coins >= this.state.clickPowerCost) {
            this.state.coins -= this.state.clickPowerCost;
            this.state.clickPowerLevel++;
            this.state.clickPower = this.state.clickPowerLevel;
            this.state.clickPowerCost = Math.round(this.state.clickPowerCost * 1.5);
            if (this.state.soundOn) {
                this.audio.playUpgradeSound();
            }
            this.updateUI();
        }
    }
    upgradeAutoClick() {
        if (this.state.coins >= this.state.autoClickCost) {
            this.state.coins -= this.state.autoClickCost;
            this.state.autoClickLevel++;
            this.state.autoClickRate = this.state.autoClickLevel * 0.5;
            this.state.autoClickCost = Math.round(this.state.autoClickCost * 1.7);
            this.ui.autoGeneration.classList.remove('hidden');
            if (this.state.soundOn) {
                this.audio.playUpgradeSound();
            }
            this.setupAutoClick();
            this.updateUI();
        }
    }
    updateUI() {
        this.ui.coins.textContent = Math.floor(this.state.coins);
        this.ui.level.textContent = this.state.level;
        this.ui.clickPowerLevel.textContent = this.state.clickPowerLevel;
        this.ui.clickPowerCost.textContent = this.state.clickPowerCost;
        this.ui.autoClickLevel.textContent = this.state.autoClickLevel;
        this.ui.autoClickCost.textContent = this.state.autoClickCost;
        this.ui.autoRate.textContent = this.state.autoClickRate.toFixed(1);
        this.upgradeButtons.clickPower.disabled = this.state.coins < this.state.clickPowerCost;
        this.upgradeButtons.autoClick.disabled = this.state.coins < this.state.autoClickCost;
        this.saveGame();
    }
    toggleSound() {
        this.state.soundOn = !this.state.soundOn;
        this.ui.soundToggle.classList.toggle('sound-on', this.state.soundOn);
        this.ui.soundToggle.classList.toggle('sound-off', !this.state.soundOn);
        if (this.state.soundOn) {
            this.audio.playBackgroundMusic();
        } else {
            this.audio.stopBackgroundMusic();
        }
        this.saveGame();
    }
    toggleTheme() {
        this.state.darkMode = !this.state.darkMode;
        document.body.style.backgroundColor = this.state.darkMode ? '#121212' : '#f5f5ff';
        document.body.style.color = this.state.darkMode ? '#ffffff' : '#333333';
        this.ui.themeToggle.classList.toggle('light-mode', !this.state.darkMode);
        this.ui.themeToggle.classList.toggle('dark-mode', this.state.darkMode);
        this.saveGame();
    }
    toggleSettings() {
        this.ui.settingsMenu.classList.toggle('hidden');
    }
    saveGame() {
        localStorage.setItem('earnPaisaGame', JSON.stringify(this.state));
    }
    loadGame() {
        const savedState = localStorage.getItem('earnPaisaGame');
        if (savedState) {
            this.state = JSON.parse(savedState);
        }
    }
    resetGame() {
        if (confirm('Reset all progress?')) {
            this.state = {
                coins: 0,
                level: 1,
                clickPower: 1,
                clickPowerLevel: 1,
                clickPowerCost: 10,
                autoClickRate: 0,
                autoClickLevel: 0,
                autoClickCost: 50,
                darkMode: this.state.darkMode,
                soundOn: this.state.soundOn,
                musicVolume: this.state.musicVolume,
                sfxVolume: this.state.sfxVolume
            };
            this.ui.autoGeneration.classList.add('hidden');
            this.updateUI();
            this.audio.stopBackgroundMusic();
            if (this.state.soundOn) {
                this.audio.playBackgroundMusic();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new EarnPaisaGame();
    game.init();
});