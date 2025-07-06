document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const question = document.getElementById('question');
    const optionsDiv = document.querySelector('.options');
    const message = document.getElementById('message');

    // "না" বাটন সরানোর ফাংশন
    function moveNoButton() {
        const containerRect = optionsDiv.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();

        let newX, newY;
        let attempts = 0;
        const maxAttempts = 100;
        const padding = 20; // Ensure button stays within container bounds

        do {
            newX = Math.random() * (containerRect.width - noBtnRect.width - padding * 2) + padding;
            newY = Math.random() * (containerRect.height - noBtnRect.height - padding * 2) + padding;
            attempts++;
        } while (attempts < maxAttempts && isOverlapping(newX, newY, noBtnRect.width, noBtnRect.height, yesBtn));

        noBtn.style.position = 'absolute'; // নিশ্চিত করতে যে অবস্থান পরিবর্তন হবে
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.classList.add('moved'); // ক্লাস যোগ করুন যাতে ট্রানজিশন ০ থাকে
    }

    //Overlap check
    function isOverlapping(x, y, width, height, otherButton) {
        const otherRect = otherButton.getBoundingClientRect();

        // Calculate otherButton's position relative to the optionsDiv
        const otherX = otherButton.offsetLeft;
        const otherY = otherButton.offsetTop;

        return !(x + width < otherX ||
                 x > otherX + otherRect.width ||
                 y + height < otherY ||
                 y > otherY + otherRect.height);
    }


    // যখন মাউস "না" বাটনের উপর আসবে
    noBtn.addEventListener('mouseover', () => {
        if (!message.classList.contains('hidden')) return; // যদি মেসেজ দেখা যায়, তাহলে আর সরানোর দরকার নেই
        moveNoButton();
    });

    // যখন মোবাইল দিয়ে "না" বাটনে ট্যাপ করা হবে
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // ডিফল্ট ট্যাপ আচরণ বন্ধ করুন
        if (!message.classList.contains('hidden')) return;
        moveNoButton();
    });

    // "হ্যাঁ" বাটনে ক্লিক করলে
    yesBtn.addEventListener('click', () => {
        question.classList.add('hidden');
        optionsDiv.classList.add('hidden');
        message.innerHTML = "একসেপ্ট করার জন্য থ্যাংকস, I love you too";
        message.classList.remove('hidden');
    });

    // Initial position adjustment for noBtn
    // This makes sure noBtn is positioned correctly when the page loads
    const initialNoBtnLeft = yesBtn.offsetLeft + yesBtn.offsetWidth + 30; // Yes button + gap
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${initialNoBtnLeft}px`;
    noBtn.style.top = `${yesBtn.offsetTop}px`;
});
