import React, { FC } from 'react';
import { FocusElement } from '../FocusInput';
import { ButtonVariants } from './partials/variants';

export const ButtonBasic: FC = () => <FocusElement RefComponent={ButtonVariants} />;
