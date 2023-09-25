import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputColorVariants } from './partials/variants';

export const InputColorBasic: FC = () => <FocusInput RefInput={InputColorVariants} />;
