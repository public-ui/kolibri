import React from 'react';

import { KolButton, KolCard } from '@public-ui/react';

import type { FC } from 'react';

export const CardConfirm: FC = () => (
	<KolCard _has-footer _label="Überschrift">
		<div>
			<p className="p-2">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta pariatur laudantium saepe ipsa atque officia cupiditate repudiandae harum earum aut
				doloribus autem libero exercitationem dolor ad, magni dignissimos ratione fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
				perferendis qui animi nesciunt illo facere, doloribus sint cupiditate nihil dolorem voluptate ab esse! Ducimus ad est commodi molestias voluptas
				reiciendis.
			</p>
			<div className="flex gap-2 flex-justify-end">
				<KolButton className="w-12rem" _variant="primary" _label="Speichern"></KolButton>
				<KolButton className="w-12rem" _variant="secondary" _label="Abbrechen"></KolButton>
			</div>
		</div>
	</KolCard>
);
