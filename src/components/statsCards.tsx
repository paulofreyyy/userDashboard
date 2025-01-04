import { Box, Card, CardContent, Typography } from "@mui/material";

interface Props {
    title: string;
    value: number | undefined;
    icon: JSX.Element;
    iconColor: string;
}

export const StatsCard = ({ title, value, icon, iconColor }: Props) => {
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 4,
            }}
        >
            <CardContent>
                <Typography>{title}</Typography>
                <Typography fontWeight='bold' fontSize='1.5rem'>{value}</Typography>
            </CardContent>

            <Box sx={{ fontSize: 45, color: iconColor }}>
                {icon}
            </Box>
        </Card>
    )
}