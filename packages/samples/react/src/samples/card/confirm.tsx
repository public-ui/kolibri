import React from 'react';
import { KolButton, KolCard } from '@public-ui/react';

import { FC } from 'react';

export const CardConfirm: FC = () => (
	<KolCard _has-footer _heading="Überschrift">
		<p className="p-2" slot="content">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta pariatur laudantium saepe ipsa atque officia cupiditate repudiandae harum earum aut
			doloribus autem libero exercitationem dolor ad, magni dignissimos ratione fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
			perferendis qui animi nesciunt illo facere, doloribus sint cupiditate nihil dolorem voluptate ab esse! Ducimus ad est commodi molestias voluptas
			reiciendis.
		</p>
		<div slot="footer" className="d-flex gap-2 float-end">
			<KolButton className="w-12rem" _variant="primary" _label="Speichern"></KolButton>
			<KolButton className="w-12rem" _variant="secondary" _label="Abbrechen"></KolButton>
		</div>
	</KolCard>
);
