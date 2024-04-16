import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import menorRoutes  from "./routes/menor.routes.js";
import noticiaRoutes from "./routes/noticias.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import uploadRoutes from "./routes/upload.routes.js"


const app = express()

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", menorRoutes);
app.use("/api", noticiaRoutes);
app.use("/api", adminRoutes)
app.use("/api", uploadRoutes)

export default app;