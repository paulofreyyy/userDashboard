import { Box, Card, CardContent, Typography } from "@mui/material";

interface Props {
    title: string;
    value: number | undefined;
    icon: JSX.Element;
}

export const StatsCard = ({ title, value, icon }: Props) => {
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 2,
            }}
        >
            <CardContent>
                <Typography>{title}</Typography>
                <Typography fontWeight='bold' fontSize='1.5rem'>{value}</Typography>
            </CardContent>

            <Box sx={{ fontSize: 40 }}>
                {icon}
            </Box>
        </Card>
    )
}