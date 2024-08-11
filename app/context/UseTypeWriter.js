import { useEffect, useState } from 'react';

const useTypeWriter = (fullText, typewriterSpeed, pauseDuration) => {
    const [text, setText] = useState('');

    useEffect(() => {
        let index = 0;

        const typewriter = () => {
            const interval = setInterval(() => {
                setText(prev => prev + fullText[index]);
                index++;
                if (index >= fullText.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        startTyping();
                    }, pauseDuration);
                }
            }, typewriterSpeed);
        };

        const startTyping = () => {
            setText('');
            index = 0;
            typewriter();
        };

        startTyping();

        return () => clearInterval(typewriter); // Cleanup
    }, [fullText, typewriterSpeed, pauseDuration]);

    return text;
};
export default useTypeWriter