import type { FC } from 'react';
import React from 'react';

import { FocusElement } from '../FocusInput';
import { ButtonVariants } from './partials/variants';

export const ButtonBasic: FC = () => <FocusElement RefComponent={ButtonVariants} />;
