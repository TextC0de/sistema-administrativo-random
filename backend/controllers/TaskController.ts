import { NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import { formatIds, trimTask } from 'lib/utils';
import Task from '../models/Task';
import { NextConnectApiRequest } from './interfaces';
import { ResponseData } from './types';
import User from 'backend/models/User'
import { ITask } from 'backend/models/interfaces';


const TaskController = {
    putTask: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req    
        await dbConnect()
        const {
            _id,
            branch,
            business,
            assigned,
            taskType,
            openedAt,
            status,
            description,
            participants,
            auditor, 
            activity, 
            operatorName, 
            image, 
            workOrderNumber, 
            closedAt
        }:ITask = body
        const taskForm = {
            branch, 
            business, 
            assigned, 
            taskType, 
            openedAt, 
            status,
            description, 
            participants,
            auditor, 
            activity, 
            operatorName, 
            image, 
            workOrderNumber, 
            closedAt}
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
        const deletedTask = await Task.findById(body._id)
        if(!deletedTask) return res.json({statusCode:500, error:'could not delete Task'})
        await deletedTask.softDelete()
        res.json({statusCode:200, data:{message:'deleted Task succesfully'}})
    },
    getTechTasks: async (req:NextConnectApiRequest, res: NextApiResponse<ResponseData>) =>{
        const {userId} = req
        await dbConnect()
        const docUser = await User.findById(userId)
        if(!docUser) return res.json({statusCode:500, error:'User not found'})
        const docTasks = await docUser.getTasks()
        const tasks = formatIds(docTasks)
        const trimmedTasks = tasks.map((task:ITask )=> trimTask(task))
        //console.log(trimmedTasks)
        res.json({statusCode:200, data:{tasks:trimmedTasks}})
    },
    postTechTask: async(req:NextConnectApiRequest, res: NextApiResponse<ResponseData>) =>{
        const {body} = req
        await dbConnect()
        console.log(body);
        

    }
}

export default TaskController