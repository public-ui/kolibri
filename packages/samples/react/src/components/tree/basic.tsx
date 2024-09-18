import type { FC } from 'react';
import React, { useContext, useState } from 'react';
import { KolBadge, KolButton, KolTree, KolTreeItem } from '@public-ui/react';
import { getRandomEmoji } from '../../shares/randomEmoji';
import { useParams } from 'react-router';
import { HideMenusContext } from '../../shares/HideMenusContext';
import { SampleDescription } from '../SampleDescription';

export const TreeBasic: FC = () => {
	const hideMenus = useContext(HideMenusContext);
	const { subPage } = useParams();
	const [homeLabel, setHomeLabel] = useState('1 Home');
	const [showPets, setShowPets] = useState(false);
	const [showEurope, setShowEurope] = useState(false);
	const [showProducts, setShowProducts] = useState(true);
	const updateHomeLabel = () => {
		setHomeLabel(`1 Home ${getRandomEmoji()}`);
	};

	const getItemProps = (page: string) => {
		return {
			_href: `#/tree/basic/${page}${hideMenus ? '?hideMenus' : ''}`,
			_active: page === subPage,
		};
	};

	return (
		<>
			<SampleDescription>
				<p>KolTree renders a keyboard accessible nested navigation. Branches of the tree can be collapsed or expanded.</p>
			</SampleDescription>
			{!hideMenus && <KolBadge className="block mb-3" _label="Component is a DRAFT - Don't use in production yet." _color="#db5461" />}

			<KolTree _label="Sitemap" class="block w-fit">
				<KolTreeItem _label={homeLabel} {...getItemProps('home')}></KolTreeItem>
				<KolTreeItem _label="2 About (open initially)" {...getItemProps('about')} _open>
					<KolTreeItem _label="2.1 Team" {...getItemProps('team')}>
						<KolTreeItem _label="2.1.1. Values" {...getItemProps('values')}></KolTreeItem>
						<KolTreeItem _label="2.1.2. Members" {...getItemProps('members')}>
							<KolTreeItem _label="2.1.2.1 Humans" {...getItemProps('humans')}></KolTreeItem>
							{showPets && <KolTreeItem _label="2.1.2.2 Pets" {...getItemProps('pets')}></KolTreeItem>}
						</KolTreeItem>
						<KolTreeItem _label="2.1.3 Locations" {...getItemProps('locations')}>
							{showEurope && (
								<KolTreeItem _label="2.1.3.1 Europe" {...getItemProps('europe')}>
									<KolTreeItem _label="2.1.3.1.1 Denmark" {...getItemProps('denmark')} />
									<KolTreeItem _label="2.1.3.1.2 Netherlands" {...getItemProps('netherlands')} />
								</KolTreeItem>
							)}
						</KolTreeItem>
					</KolTreeItem>
				</KolTreeItem>
				{showProducts && (
					<KolTreeItem _label="3. Products" {...getItemProps('products')}>
						<KolTreeItem _label="3.1 Home" {...getItemProps('home-products')}>
							<KolTreeItem _label="3.1.1 Refrigerators" {...getItemProps('fridges')}></KolTreeItem>
							<KolTreeItem _label="3.1.2 Coffee makers" {...getItemProps('coffee-makers')}></KolTreeItem>
						</KolTreeItem>
						<KolTreeItem _label="3.1 Office" {...getItemProps('office-products')}>
							<KolTreeItem _label="3.2.1 Printers" {...getItemProps('printers')}></KolTreeItem>
						</KolTreeItem>
					</KolTreeItem>
				)}
			</KolTree>

			<p>Current tree item: {subPage ?? 'none'}</p>

			<div className="flex flex-row gap-2">
				<KolButton _label="Change label for '1 Home'" _on={{ onClick: updateHomeLabel }}></KolButton>
				<KolButton _label="Toggle '2.1.2.2 Pets'" _on={{ onClick: () => setShowPets(!showPets) }}></KolButton>
				<KolButton _label="Toggle '2.2.1 Europe' (two levels at once)" _on={{ onClick: () => setShowEurope(!showEurope) }}></KolButton>
				<KolButton _label="Toggle '3. Products'" _on={{ onClick: () => setShowProducts(!showProducts) }}></KolButton>
			</div>
		</>
	);
};
