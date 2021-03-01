import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Infobox.css';

function InfoBox({ title, today, total, click }) {
  return (
    <Card className='infoBox' onClick={click}>
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
