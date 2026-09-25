import  express  from 'express';
import { agentController } from '../controller/agentController.js';
const router = express.Router();


router.post('/chat', agentController);

export default router