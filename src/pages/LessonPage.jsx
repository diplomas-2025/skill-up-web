import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLessonById } from "../api/api";
import { Container, Typography, Paper, CircularProgress, Box } from "@mui/material";

export const LessonPage = () => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLessonById(lessonId).then((data) => {
            setLesson(data);
            setLoading(false);
        });
    }, [lessonId]);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                lesson && (
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
                            {lesson.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />
                    </Paper>
                )
            )}
        </Container>
    );
};