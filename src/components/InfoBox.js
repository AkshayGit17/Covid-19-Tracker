import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, today, total }) {
  return (
    <Card className='infoBox'>
      <CardContent>
        {/* Title */}
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>

        {/* Today*/}
        <h2 className='infoBox__today'>{today}</h2>

        {/* Total*/}
        <Typography className='infoBox__total' color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
