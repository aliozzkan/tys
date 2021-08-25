import React from 'react'
import {
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
  BackgroundColorProps,
  backgroundColor,
} from '@shopify/restyle';
import {Theme} from '../../theme'
import { ColorProps } from '@chakra-ui/react';

type Props = SpacingProps<Theme> & BackgroundColorProps<Theme> & VariantProps<Theme, 'cardVariants'> & {children: any}
const Card = createRestyleComponent<Props, Theme>([
  spacing,
  backgroundColor,
  createVariant({themeKey: 'cardVariants'})
])

export default Card