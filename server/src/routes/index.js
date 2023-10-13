const authRouter = require("./auth");
const userRouter = require("./user");
const employerRouter = require("./employer");
const jobRouter = require("./job");
const addressRouter = require("./address");
const candidateRouter = require("./candidate");
const categoryRouter = require("./category");
const analyticRouter = require("./analytic");
const feedbackRouter = require("./feedback");
const chatbotRouter = require("./chatbot");
const applyJobRouter = require("./applyJob");

const router = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/employer", employerRouter);
  app.use("/api/v1/job", jobRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/candidate", candidateRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/analytic", analyticRouter);
  app.use("/api/v1/feedback", feedbackRouter);
  app.use("/api/v1/chatbot", chatbotRouter);
  app.use("/api/v1/applyJob", applyJobRouter);
};

module.exports = router;
