import Notiflix from 'notiflix';
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const delay = parseInt(formData.get('delay'));
  const step = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));
  if (step < 0 || delay < 0 || amount <= 0) {
    Notiflix.Notify.failure(
      '❌ Invalid input values. Please, enter valid values'
    );
  } else {
    for (let i = 0; i < amount; i += 1) {
      createPromise(i + 1, delay + step * i)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms.`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms.`
          );
        });
    }
  }
});
