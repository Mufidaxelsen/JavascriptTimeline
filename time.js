window.addEventListener("DOMContentLoaded",() => {
  const c = new Clock6(".clock");
});

class Clock6 {
  constructor(el) {
    this.el = document.querySelector(el);

    this.init();
  }
  init() {
    this.timeUpdate();
  }
  get timeAsObject() {
    const date = new Date();
    let h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    return { h, m, s };
  }
  get timeAsString() {
    let { h, m, s } = this.timeAsObject;
    // insert 0 before single digits
    if (h < 10) h = `0${h}`;
    if (m < 10) m = `0${m}`;
    if (s < 10) s = `0${s}`;

    return `${h}:${m}:${s}`;
  }
  get timeDigits() {
    return this.timeAsString.split("").filter(p => p !== ":");
  }
  timeUpdate() {
    // update the `aria-label`
    this.el?.setAttribute("aria-label", this.timeAsString);
    // update the digits
    this.timeDigits.forEach((digit,i) => {
      const digitEl = this.el.querySelectorAll("[data-digit]")[i];
      if (!digitEl) return;

      digitEl.setAttributeNS(null,"data-digit",digit);
    });
    // loop
    clearTimeout(this.timeUpdateLoop);
    this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this),1e3);
  }
}