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
                borderRadius: 4
            }}
            elevation={0}
        >
            <CardContent>
                <Typography color="#9996BC">{title}</Typography>
                <Typography fontWeight='bold' fontSize='2rem'>{value}</Typography>
            </CardContent>

            <Box sx={{ fontSize: 55, color: iconColor }}>
                {icon}
            </Box>
        </Card>
    )
}