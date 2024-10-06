import { Iso8601, Option } from '@public-ui/components';
import { sleep } from '../utils/sleep';

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

const cache: Record<Iso8601 | string, Option<string>[]> = {};

export const fetchAvailableTimes = async (queryData: { date: Iso8601 | string }): Promise<Option<string>[]> => {
	if (!queryData?.date) {
		return [];
	}

	if (cache[queryData.date]) {
		return Promise.resolve(cache[queryData.date]);
	}

	await sleep(1000);

	const data = getRandomTimes().map((time) => ({
		label: time,
		value: time,
	}));

	cache[queryData.date] = data;
	return Promise.resolve(cache[queryData.date]);
};
