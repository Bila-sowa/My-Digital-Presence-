document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('.audio-player');
    const playButton = document.querySelector('.button-play');
    const volumeSlider = document.querySelector('.volume-slider');
    const timeSlider = document.querySelector('.time-slider');
    const trackTime = document.querySelector('.track-time');
    const trackName = document.querySelector('.track-name');
    const trackIcon = document.querySelector('.track-icon');

    // Welcome overlay handler
    const welcomeOverlay = document.querySelector('.welcome-overlay');
    const welcomeButton = document.querySelector('.welcome-button');
    let revealClicked = false;

    const viewsValue = document.querySelector('.views-value');
    const viewsContainer = document.querySelector('.views-container');

    function startViewsUpdateTimer() {
        setTimeout(() => {
            if (viewsValue) {
                viewsValue.textContent = '18';
            }
            if (viewsContainer) {
                viewsContainer.classList.add('views-update');
                window.setTimeout(() => {
                    viewsContainer.classList.remove('views-update');
                }, 900);
            }
        }, 2500);
    }

    if (welcomeButton) {
        welcomeButton.addEventListener('click', () => {
            welcomeOverlay.classList.add('hidden');
            revealClicked = true;
            audio.play().catch(() => {
                
            });
            startViewsUpdateTimer();
        });
    }

    window.addEventListener('keydown', (event) => {
        if (!revealClicked) return;
        if (event.code === 'Space' || event.key === ' ') {
            if (event.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
                return;
            }
            event.preventDefault();
            if (audio.paused) {
                audio.play().catch(() => {
                    
                });
            } else {
                audio.pause();
            }
        }
    });

    const tracks = [
        {
            title: 'SEMATARY - DEAD TREES',
            src: './Music/track.mp3',
            url: 'https://soundcloud.com/semataryy/15-sematary-dead-trees-ft',
            image: './Images/PlayerImage.jpg'
        }
    ];

    let currentTrack = 0;
    let isSeeking = false;

    function formatTime(seconds) {
        if (Number.isNaN(seconds) || seconds === Infinity) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.src;
        trackName.textContent = track.title;
        trackName.href = track.url;
        trackIcon.src = track.image;
        audio.load();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        trackTime.textContent = '0:00';
        timeSlider.value = 0;
    }

    function updatePlayButton() {
        if (audio.paused) {
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            playButton.title = 'Play';
        } else {
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            playButton.title = 'Pause';
        }
    }

    function updateTime() {
        if (!audio.duration || isSeeking) return;
        const current = audio.currentTime;
        const duration = audio.duration;
        timeSlider.value = duration ? (current / duration) * 100 : 0;
        trackTime.textContent = `${formatTime(current)}`;
    }

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    timeSlider.addEventListener('input', () => {
        isSeeking = true;
        const duration = audio.duration || 0;
        const newTime = (timeSlider.value / 100) * duration;
        trackTime.textContent = `${formatTime(newTime)}`;
    });

    timeSlider.addEventListener('change', () => {
        const duration = audio.duration || 0;
        audio.currentTime = (timeSlider.value / 100) * duration;
        isSeeking = false;
    });

    audio.addEventListener('loadedmetadata', () => {
        trackTime.textContent = '0:00';
    });

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', updatePlayButton);
    audio.addEventListener('pause', updatePlayButton);
    audio.addEventListener('ended', () => {
        updatePlayButton();
        timeSlider.value = 100;
    });

    loadTrack(currentTrack);
    audio.volume = volumeSlider.value / 100;
    audio.play().catch(() => {
        
    });
});
