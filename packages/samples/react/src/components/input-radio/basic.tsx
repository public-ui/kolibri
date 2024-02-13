import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputRadioVariants } from './partials/variants';

export const InputRadioBasic: FC = () => <FormWrap RefComponent={InputRadioVariants} />;
