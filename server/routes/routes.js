
import express from 'express'


import {moderateImage , getModerationStatus} from '../controller/imageController.js'
import { googleAuth } from '../controller/googleAuthController.js'
import { upload } from '../middlewares/upload.js'
import authMiddleware from '../middlewares/auth.js'
import apiKeyAuth from '../middlewares/apiKeyAuth.js'
import { createProject , getProjects } from '../controller/ProjectController.js'
import { createApiKey, getApiKeys } from '../controller/apikeyController.js'
import apiRateLimiter from '../middlewares/rateLimiter.js'




const router = express.Router()

router.post('/moderate',apiKeyAuth,apiRateLimiter,upload.single("image"), moderateImage)
router.get('/moderation-status/:requestId', getModerationStatus)
router.post('/google', googleAuth)


//projects

router.post('/projects/create',authMiddleware, createProject)
router.get("/projects", authMiddleware, getProjects);


//apiKey
router.post("/apikeys/create",authMiddleware,createApiKey);
router.get('/apikeys',authMiddleware,getApiKeys)

export default router