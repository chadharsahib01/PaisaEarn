class GameAnimations {
    constructor() {
        this.hamsterElement = document.getElementById('hamster');
        this.clickFeedback = document.getElementById('click-feedback');
    }
    initHamsterAnimations() {
        try {
            this.hamsterAnimation = lottie.loadAnimation({
                container: this.hamsterElement,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'assets/animations/hamster-idle.json'
            });
        } catch (e) {
            console.log('Lottie animation failed:', e);
        }
    }
    playClickAnimation() {
        this.clickFeedback.classList.remove('hidden');
        gsap.fromTo(this.clickFeedback, 
            { opacity: 0, y: 10 },
            { 
                opacity: 1, 
                y: -50, 
                duration: 1, 
                ease: "power2.out",
                onComplete: () => {
                    this.clickFeedback.classList.add('hidden');
                }
            }
        );
    }
    playLevelUpAnimation() {
        gsap.to(this.hamsterElement, {
            scale: 1.2,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.3)"
        });
    }
}