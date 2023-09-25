import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { SelectVariants } from './partials/variants';

export const SelectBasic: FC = () => <FocusInput RefInput={SelectVariants} />;
