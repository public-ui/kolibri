import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputColorVariants } from './partials/variants';

export const InputColorBasic: FC = () => <FormWrap RefComponent={InputColorVariants} />;
