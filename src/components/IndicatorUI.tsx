import { Card, CardContent, Typography } from "@mui/material";

interface IndicatorUIProps {
    title: string;
    value: string | number;
    description: string;
}

export default function IndicatorUI({ title, value, description }: IndicatorUIProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    {value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}