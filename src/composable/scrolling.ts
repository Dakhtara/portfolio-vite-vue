export function useScrolling() {
  function doScrolling(target: string, duration: number = 300): void {

    const targetElement = document.getElementById(target);
    if (!targetElement) {
      return
    }

    const elementY = window.scrollY + targetElement.getBoundingClientRect().top;
    const startingY = window.scrollY || document.documentElement.scrollTop;
    const diff = elementY - startingY;
    let start: number | undefined;

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) {
        start = timestamp;
      }
      // Elapsed milliseconds since start of scrolling.
      var time = timestamp - start;
      // Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * percent);

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }

  return { doScrolling }
}
