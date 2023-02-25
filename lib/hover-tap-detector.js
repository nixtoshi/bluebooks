// Detects wether a user is using a mouse or tapping and adds a class called hasHover to the body tag when a mouse is detected. To use it, in your CSS the rules with hover should point to 
// Made by https://stackoverflow.com/users/388994/blade
function watchForHover() {
    let hasHoverClass = false;
    let container = document.body;
    let lastTouchTime = 0;

    function enableHover() {
        // filter emulated events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.className += ' hasHover';
        hasHoverClass = true;
    }

    function disableHover() {
        if (!hasHoverClass) return;

        container.className = container.className.replace(' hasHover', '');
        hasHoverClass = false;
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

watchForHover();