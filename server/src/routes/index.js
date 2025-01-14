const authRouter = require("./auth");
const userRouter = require("./user");
const employerRouter = require("./employer");
const jobRouter = require("./job");
const addressRouter = require("./address");
const candidateRouter = require("./candidate");
const categoryRouter = require("./category");
const analyticRouter = require("./analytic");
const feedbackRouter = require("./feedback");
const applyJobRouter = require("./applyJob");
const recommenderRouter = require("./recommender");
const transactionRouter = require("./transaction");
const searchRouter = require("./search");
const scheduleRouter = require("./schedule");
const workPositionRequiredRouter = require("./workPositionRequired");
const rasaRouter = require("./rasa");
const postRouter = require("./post");
const commentRouter = require("./comment");

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
  app.use("/api/v1/applyJob", applyJobRouter);
  app.use("/api/v1/recommender", recommenderRouter);
  app.use("/api/v1/transaction", transactionRouter);
  app.use("/api/v1/workPositionRequired", workPositionRequiredRouter);
  app.use("/api/v1/search", searchRouter);
  app.use("/api/v1/schedule", scheduleRouter);
  app.use("/api/v1/rasa", rasaRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/comment", commentRouter);
};

module.exports = router;
