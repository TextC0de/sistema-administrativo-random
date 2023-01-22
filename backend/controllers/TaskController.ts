import { NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import Task from '../models/Task';
import { NextConnectApiRequest } from './interfaces';
import { ResponseData } from './types';


const TaskController = {
    putTask: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req    
        await dbConnect()
        const {_id, branch, business, assigned, taskType, openedAt, status,description, participants,auditor, activity, operatorName, image, workOrderNumber, closedAt} = body
        const taskForm = {branch, business, assigned, taskType, openedAt, status,description, participants,auditor, activity, operatorName, image, workOrderNumber, closedAt}
        try {
            const newTask = await Task.findByIdAndUpdate(_id, taskForm, {
                new: true,
                runValidators: true,
                })
            if(!newTask) res.json({statusCode:500, error:'could not update Task'})
            
            res.json({statusCode:200, data:{task:formatIds(newTask), message:'updated Task succesfully'}})
        }
        catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not update Task'})
        }
    },
    postTask: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req    
        await dbConnect()
        const {branch, business, assigned, taskType, description, participants, activity, operatorName, image, workOrderNumber, status, closedAt} = body
        const openedAt = new Date()
        const taskForm = {branch, business, assigned, taskType, openedAt, status, description, participants, activity, operatorName, image, workOrderNumber,closedAt}
        try {
            const newTask = await Task.create(taskForm)
            if(!newTask) return res.json({statusCode:500, error:'could not create Task'})
            
            return res.json({statusCode:200, data:{task:formatIds(newTask), message:'created Task succesfully'}})
        } catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not create Task'})
        }
    },
    deleteTask: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req
        await dbConnect()
        const deletedTask = await Task.findByIdAndDelete(body._id)
        if(!deletedTask) return res.json({statusCode:500, error:'could not delete Task'})
        //const Task = formatIds(newTask)
        res.json({statusCode:200, data:{message:'deleted Task succesfully'}})
    }
}

export default TaskController