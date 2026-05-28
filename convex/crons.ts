import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Process drip email queue daily at 9am ET (1pm UTC)
crons.daily(
  "process-drip-emails",
  { hourUTC: 13, minuteUTC: 0 },
  internal.dripCampaign.processDripQueue,
);

export default crons;
