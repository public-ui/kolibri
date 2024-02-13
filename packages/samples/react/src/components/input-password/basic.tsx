import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputPasswordVariants } from './partials/variants';

export const InputPasswordBasic: FC = () => <FormWrap RefComponent={InputPasswordVariants} />;
