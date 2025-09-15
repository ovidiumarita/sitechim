
(function() {
    function isHomeOrInfoPage() {
    
        if (document.querySelector('.search-container')) return true;
    
        if (window.location.pathname.toLowerCase().includes('/privacy')) return true;
      
        var title = document.title.trim().toLowerCase();
        if (title.includes('informa')) return true;
        var h1 = document.querySelector('h1');
        if (h1 && h1.textContent.trim().toLowerCase().includes('informa')) return true;
        return false;
    }
    function getTheme() {
        return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
    }
    function setStars(container, rating) {
        const theme = getTheme();
        Array.from(container.querySelectorAll('.star')).forEach((star, i) => {
            if (i < rating) {
                star.style.color = theme === 'dark' ? '#eebbc3' : '#FFD600';
            } else {
                star.style.color = theme === 'dark' ? '#444' : '#ccc';
            }
        });
        if (theme === 'dark') {
            container.style.color = '#eebbc3';
        } else {
            container.style.color = '';
        }
    }
    function createFeedbackWidget() {
        const widget = document.createElement('div');
        widget.className = 'feedback-widget glass-card';
        widget.innerHTML = `
            <div style="margin-bottom:12px;font-weight:600;font-size:1.1rem;">Lasă un feedback:</div>
            <div class="stars" style="font-size:2rem;margin-bottom:10px;">
                <span class="star" data-value="1">&#9733;</span>
                <span class="star" data-value="2">&#9733;</span>
                <span class="star" data-value="3">&#9733;</span>
                <span class="star" data-value="4">&#9733;</span>
                <span class="star" data-value="5">&#9733;</span>
            </div>
            <textarea class="feedback-comment" placeholder="Comentariu (opțional)" style="width:100%;border-radius:12px;padding:8px 12px;resize:vertical;min-height:48px;margin-bottom:10px;"></textarea>
            <button class="btn btn-primary feedback-submit" style="border-radius:18px;padding:8px 28px;font-weight:600;">Trimite</button>
            <div class="feedback-message" style="margin-top:8px;font-size:1rem;display:none;"></div>
        `;
        return widget;
    }
    function initFeedback() {
        if (isHomeOrInfoPage()) return;
        if (document.querySelector('.feedback-widget')) return;
        var footer = document.querySelector('footer, .footer-bar');
        if (!footer) return;
        const widget = createFeedbackWidget();
        footer.parentNode.insertBefore(widget, footer);
        let rating = 0;
        const stars = widget.querySelectorAll('.star');
        stars.forEach((star, i) => {
            star.addEventListener('mouseenter', () => setStars(widget, i+1));
            star.addEventListener('mouseleave', () => setStars(widget, rating));
            star.addEventListener('click', () => {
                rating = i+1;
                setStars(widget, rating);
            });
        });
        setStars(widget, 0);
        const observer = new MutationObserver(() => setStars(widget, rating));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        widget.querySelector('.feedback-submit').onclick = function() {
            if (rating === 0) {
                widget.querySelector('.feedback-message').textContent = 'Alege o notă (stelute)!';
                widget.querySelector('.feedback-message').style.display = 'block';
                widget.querySelector('.feedback-message').style.color = 'red';
                return;
            }
            widget.querySelector('.feedback-message').textContent = 'Mulțumim pentru feedback!';
            widget.querySelector('.feedback-message').style.display = 'block';
            widget.querySelector('.feedback-message').style.color = getTheme() === 'dark' ? '#eebbc3' : '#3b5fff';
            widget.querySelector('.feedback-submit').disabled = true;
            setTimeout(() => {
                widget.querySelector('.feedback-message').style.display = 'none';
                widget.querySelector('.feedback-submit').disabled = false;
                setStars(widget, 0);
                rating = 0;
                widget.querySelector('.feedback-comment').value = '';
            }, 2500);
        };
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeedback);
    } else {
        initFeedback();
    }
})();
