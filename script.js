var arrow, curve, D;

arrow = document.getElementById('arrow');
curve = document.getElementById('curve');

D = curve.getTotalLength();

var dt = 0.003,// step size
    vision = 2;	// how many steps to look ahead for rotation

const scrollY = () => window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop

const adjustPointer = (t) => {// parameter 0->1 to parametrize position on curve
    t = t % 1
    var p = curve.getPointAtLength(t * D);

    // To calculate angle get one point ahead, and one you just passed
    var p0 = curve.getPointAtLength(((1 + t - 0.5 * vision * dt) % 1) * D);
    var p1 = curve.getPointAtLength(((t + vision * dt) % 1) * D);

    var angle = 270 + Math.atan2(p1.y - p0.y, p1.x - p0.x) * (180 / Math.PI);

    // console.warn('transform', { px: p.x, py: p.y, angle })

    arrow.style.transform = `translate(${p.x - 30}px, ${p.y - 30}px) rotate(${angle}deg)`
}


adjustPointer(0);



// arrow.setAttribute("transform",
//     "translate(" + p.x + "," + p.y + ") rotate(" + angle + ")"
// );

window.addEventListener("scroll", () => {

    const { y, height } = curve.getBoundingClientRect()

    const curveInitial = y + scrollY();

    if (y < window.innerHeight / 2) {

        const p0 = curveInitial - window.innerHeight / 2;

        const t = (scrollY() - p0) / curve.getBoundingClientRect().height;

        adjustPointer(t)
    }
})







