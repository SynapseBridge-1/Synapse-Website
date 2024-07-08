// import React, { useState, useEffect } from 'react';

// const useTypewriter = (texts, speed = 100) => {
//   const [index, setIndex] = useState(0);
//   const [displayText, setDisplayText] = useState('');

//   useEffect(() => {
//     let timer;

//     const typeText = () => {
//       if (displayText !== texts[index]) {
//         setDisplayText(prevText => texts[index].slice(0, prevText.length + 1));
//       } else {
//         clearInterval(timer);
//         timer = setTimeout(() => {
//           timer = setInterval(eraseText, speed / 2);
//         }, 1000);
//       }
//     };

//     const eraseText = () => {
//       if (displayText.length !== 0) {
//         setDisplayText(prevText => prevText.slice(0, -1));
//       } else {
//         clearInterval(timer);
//         setIndex((index + 1) % texts.length);
//       }
//     };

//     timer = setInterval(typeText, speed);

//     return () => clearInterval(timer);
//   }, [displayText, index, speed, texts]);

//   return displayText;
// };

// const Typewriter = ({ texts, speed }) => {
//   const displayText = useTypewriter(texts, speed);

//   return <p>{displayText}</p>;
// };

// export default Typewriter;
