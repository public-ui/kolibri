import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputEmailVariants } from './partials/variants';

export const InputEmailBasic: FC = () => <FocusInput RefInput={InputEmailVariants} />;
