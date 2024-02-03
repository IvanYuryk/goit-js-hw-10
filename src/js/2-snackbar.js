import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(form.elements.delay.value, 10);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then((delay) => {
        iziToast.success({
            title: 'Fulfilled promise',
            message: `✅ Fulfilled promise in ${delay}ms`,
        });
    }).catch((delay) => {
        iziToast.error({
            title: 'Rejected promise',
            message: `❌ Rejected promise in ${delay}ms`,
        });
    });
});
