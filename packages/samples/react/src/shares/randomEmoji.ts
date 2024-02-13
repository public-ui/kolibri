export const getRandomEmoji = (): string => {
	const animalEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵'];
	return animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
};
