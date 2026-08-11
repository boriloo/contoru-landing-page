// const hoverInput1 = document.getElementById('hoverInput1');
// const hoverInput2 = document.getElementById('hoverInput2');
// const hoverInput3 = document.getElementById('hoverInput3');
// const hoverContainer1 = document.getElementById('hoverContainer1');
// const hoverContainer2 = document.getElementById('hoverContainer2');
// const hoverContainer3 = document.getElementById('hoverContainer3');

// hoverInput1?.addEventListener('mouseenter', () => {
//     hoverContainer1?.classList.add('exists')
//     hoverContainer2?.classList.remove('exists')
//     hoverContainer3?.classList.remove('exists')
// })

// hoverInput2?.addEventListener('mouseenter', () => {
//     hoverContainer2?.classList.add('exists')
//     hoverContainer1?.classList.remove('exists')
//     hoverContainer3?.classList.remove('exists')
// })

// hoverInput3?.addEventListener('mouseenter', () => {
//     hoverContainer3?.classList.add('exists')
//     hoverContainer1?.classList.remove('exists')
//     hoverContainer2?.classList.remove('exists')
// })

// const inputs = [
//     document.getElementById('hoverInput1'),
//     document.getElementById('hoverInput2'),
//     document.getElementById('hoverInput3')
// ];
// const containers = [
//     document.getElementById('hoverContainer1'),
//     document.getElementById('hoverContainer2'),
//     document.getElementById('hoverContainer3')
// ];

// let currentIndex = 0;
// let idleTimeout;
// let autoInterval;

// function setHover(index) {
//     currentIndex = index;
//     containers.forEach((container, i) => {
//         container?.classList.toggle('exists', i === index);
//     });
// }

// function resetTimers() {
//     clearTimeout(idleTimeout);
//     clearInterval(autoInterval);
    
//     // Aguarda 3 segundos de inatividade para iniciar o loop
//     idleTimeout = setTimeout(() => {
//         // Alterna as classes a cada 4 segundos
//         autoInterval = setInterval(() => {
//             setHover((currentIndex + 1) % 3);
//         }, 3000);
//     }, 3000);
// }

// inputs.forEach((input, index) => {
//     input?.addEventListener('mouseenter', () => {
//         setHover(index);
//         resetTimers(); // Reseta os contadores quando o mouse entra
//     });
    
//     input?.addEventListener('mouseleave', resetTimers); // Opcional: Reseta ao tirar o mouse
// });

// // Inicia a contagem ociosa assim que a página carrega
// resetTimers();