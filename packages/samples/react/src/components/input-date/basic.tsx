import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputDateVariants } from './partials/variants';

export const InputDateBasic: FC = () => <FormWrap RefComponent={InputDateVariants} />;
