import React, {FC} from 'react';
import {Box} from '../'

interface Props {

}


const Divider: FC<Props> = () => {
  return (
    <Box height={1} backgroundColor="gray.400" width="100%" marginVertical="s"/>
  )
}

export default Divider;