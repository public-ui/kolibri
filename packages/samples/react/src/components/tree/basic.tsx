import React, { FC, useState } from 'react';
import { KolButton, KolTree, KolTreeItem } from '@public-ui/react';
import { getRandomEmoji } from '../../shares/randomEmoji';

export const TreeBasic: FC = () => {
	const { href } = window.location;
	const [homeLabel, setHomeLabel] = useState('1 Home');
	const [showPets, setShowPets] = useState(false);
	const [showEurope, setShowEurope] = useState(false);
	const [showProducts, setShowProducts] = useState(true);
	const updateHomeLabel = () => {
		setHomeLabel(`1 Home ${getRandomEmoji()}`);
	};

	return (
		<>
			<KolTree _label="Sitemap">
				<KolTreeItem _label={homeLabel} _href={href}></KolTreeItem>
				<KolTreeItem _label="2 About (open initially)" _href={href} _open>
					<KolTreeItem _label="2.1 Team" _href={href}>
						<KolTreeItem _label="2.1.1. Values" _href={href}></KolTreeItem>
						<KolTreeItem _label="2.1.2. Members" _href={href}>
							<KolTreeItem _label="2.1.2.1 Humans" _href={href}></KolTreeItem>
							{showPets && <KolTreeItem _label="2.1.2.2 Pets" _href={href}></KolTreeItem>}
						</KolTreeItem>
						<KolTreeItem _label="2.1.3 Locations" _href={href}>
							{showEurope && (
								<KolTreeItem _label="2.1.3.1 Europe" _href={href}>
									<KolTreeItem _label="2.1.3.1.1 Denmark" _href={href} />
									<KolTreeItem _label="2.1.3.1.2 Netherlands" _href={href} />
								</KolTreeItem>
							)}
						</KolTreeItem>
					</KolTreeItem>
				</KolTreeItem>
				{showProducts && (
					<KolTreeItem _label="3. Products" _href={href}>
						<KolTreeItem _label="3.1 Home" _href={href}>
							<KolTreeItem _label="3.1.1 Refrigerators" _href={href}></KolTreeItem>
							<KolTreeItem _label="3.1.2 Coffee makers" _href={href}></KolTreeItem>
						</KolTreeItem>
						<KolTreeItem _label="3.1 Office" _href={href}>
							<KolTreeItem _label="3.2.1 Printers" _href={href}></KolTreeItem>
						</KolTreeItem>
					</KolTreeItem>
				)}
			</KolTree>

			<div className="flex flex-row gap-2">
				<KolButton _label="Change label for '1 Home'" _on={{ onClick: updateHomeLabel }}></KolButton>
				<KolButton _label="Toggle '2.1.2.2 Pets'" _on={{ onClick: () => setShowPets(!showPets) }}></KolButton>
				<KolButton _label="Toggle '2.2.1 Europe' (two levels at once)" _on={{ onClick: () => setShowEurope(!showEurope) }}></KolButton>
				<KolButton _label="Toggle '3. Products'" _on={{ onClick: () => setShowProducts(!showProducts) }}></KolButton>
			</div>
		</>
	);
};
