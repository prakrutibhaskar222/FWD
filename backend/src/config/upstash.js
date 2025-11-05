import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv"
dotenv.config()

//create ratelimiter which allows 10 request per 20 s  for testing
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100,"60 s")
})

export default ratelimit