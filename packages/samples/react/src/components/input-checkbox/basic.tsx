import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputCheckboxVariants } from './partials/variants';

export const InputCheckboxBasic: FC = () => <FormWrap RefComponent={InputCheckboxVariants} />;
