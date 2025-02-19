document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.member-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalCards = cards.length;

    // 音频控制
    const bgm = document.getElementById('bgm');
    bgm.volume = 0.5;

    // 创建临时播放按钮
    const playButton = document.createElement('button');
    playButton.innerHTML = '点击进入';
    playButton.className = 'temp-play-button';
    document.querySelector('.opening-animation').appendChild(playButton);

    // 点击按钮播放音乐并进入主界面
    playButton.addEventListener('click', () => {
        bgm.play().then(() => {
            // 播放成功后添加淡出动画
            const openingAnimation = document.querySelector('.opening-animation');
            openingAnimation.style.animation = 'fadeOut 0.5s ease-out forwards';
        }).catch(error => {
            console.log("Playback prevented:", error);
            // 即使音频播放失败也进入主界面
            const openingAnimation = document.querySelector('.opening-animation');
            openingAnimation.style.animation = 'fadeOut 0.5s ease-out forwards';
        });
    });

    // 尝试在页面加载完成后立即播放
    const playBGM = () => {
        bgm.play().catch(error => {
            console.log("Playback prevented:", error);
            // 如果自动播放失败，添加点击事件监听
            document.addEventListener('click', () => {
                bgm.play();
            }, { once: true });
        });
    };

    // 确保音频已加载
    if (bgm.readyState >= 2) {
        playBGM();
    } else {
        bgm.addEventListener('canplay', playBGM);
    }

    // 将开场动画区域作为触发器
    const openingAnimation = document.querySelector('.opening-animation');
    const openingLogo = document.querySelector('.opening-logo');

    // 点击开场动画区域播放音乐
    openingAnimation.addEventListener('click', () => {
        // 尝试播放音频
        bgm.play().catch(error => {
            console.log("Playback prevented:", error);
        });
    });

    // 触摸事件支持（移动设备）
    openingAnimation.addEventListener('touchstart', () => {
        bgm.play().catch(error => {
            console.log("Playback prevented:", error);
        });
    });

    // 添加错误处理
    bgm.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.log('Error code:', bgm.error.code);
        console.log('Error message:', bgm.error.message);
    });

    // 添加加载状态监听
    bgm.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
        console.log('Duration:', bgm.duration);
    });

    function updateCards(newIndex) {
        currentIndex = newIndex;
        
        // 更新卡片状态
        cards.forEach(card => card.classList.remove('active'));
        cards[currentIndex].classList.add('active');

        // 更新圆点状态
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // 点击卡片切换到下一张
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % totalCards;
            updateCards(nextIndex);
        });
    });

    // 点击圆点切换到对应卡片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止触发卡片的点击事件
            updateCards(index);
        });
    });

    // 初始化显示第一张卡片
    updateCards(0);
}); 