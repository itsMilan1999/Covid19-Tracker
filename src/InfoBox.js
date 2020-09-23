import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core"


function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title (coronavirus cases) */}
                <Typography className="infoBox_title" color="textSecondary">{title}</Typography>


                {/*  Number of cases (+120K) */}
                <h2 className="infoBox_cases">{cases}</h2>

                {/* Total (1.2M) */}
                <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
