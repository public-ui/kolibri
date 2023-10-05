import { Option } from '@public-ui/components';

const getRandomIntInclusive = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const padHours = (hours: number): string => `${hours < 10 ? '0' : ''}${hours}`;

const getRandomTimes = () => {
	const earliest = 8;
	const latest = 17;
	const amount = getRandomIntInclusive(2, 9);

	const times = new Set<number>();
	while (times.size !== amount) {
		times.add(getRandomIntInclusive(earliest, latest));
	}
	return [...times].sort((timeA, timeB) => timeA - timeB).flatMap((hours) => [`${padHours(hours)}:00`, `${padHours(hours)}:30`]);
};

const sleep = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const fetchAvailableTimes = async (): Promise<Option<string>[]> => {
	await sleep(1000);
	return getRandomTimes().map((time) => ({
		label: time,
		value: time,
	}));
};

export const checkAppointmentAvailability = async (time?: string): Promise<boolean> => {
	await sleep(500);
	return time?.endsWith(':30') ?? false;
};
