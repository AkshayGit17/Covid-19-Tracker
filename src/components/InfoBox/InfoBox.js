import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Infobox.css';

function InfoBox({ title, today, total, click, active, activeClasses }) {
  console.log(activeClasses);
  return (
    <Card className={`infoBox ${active && activeClasses}`} onClick={click}>
      <CardContent>
        {/* Title */}
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>

        {/* Today*/}
        <h2
          className={`'infoBox__today' ${
            title === 'Coronavirus Cases'
              ? 'infoBox__today--cases'
              : title === 'Recovered'
              ? 'infoBox__today--recovered'
              : 'infoBox__today--deaths'
          }`}
        >
          {today}
        </h2>

        {/* Total*/}
        <Typography className='infoBox__total' color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
