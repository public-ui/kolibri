import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { TextareaVariants } from './partials/variants';

export const TextareaBasic: FC = () => <FocusInput RefInput={TextareaVariants} />;
