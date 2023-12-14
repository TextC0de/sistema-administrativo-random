import { type NextApiResponse } from 'next';

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { type NextConnectApiRequest } from './interfaces';

import dbConnect from '@/lib/dbConnect';
import { formatIds, trimTask } from '@/lib/utils';
import { type ITask } from 'backend/models/interfaces';
import TaskModel from 'backend/models/Task';
import UserModel, { type User } from 'backend/models/User';

const newS3: S3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const TaskController = {
    putTask: async (req: NextConnectApiRequest, res: NextApiResponse) => {
        const { body } = req;
        await dbConnect();
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
            closedAt,
        } = body;
        const assignedIds = assigned.map((user: User) => user._id);
        const taskForm = {
            branch,
            business,
            assigned: assignedIds,
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
            closedAt,
        };

        try {
            const newTask = await TaskModel.findByIdAndUpdate(_id, taskForm, {
                new: true,
                runValidators: true,
            });
            if (newTask == null)
                res.json({ statusCode: 500, error: 'could not update Task' });

            res.json({
                statusCode: 200,
                data: { task: formatIds(newTask), message: 'updated Task succesfully' },
            });
        } catch (error) {
            return res.json({ statusCode: 500, error: 'could not update Task' });
        }
    },
    postTask: async (req: NextConnectApiRequest, res: NextApiResponse) => {
        const { body } = req;
        await dbConnect();
        const {
            branch,
            business,
            assigned,
            taskType,
            description,
            participants,
            activity,
            operatorName,
            image,
            workOrderNumber,
            closedAt,
        } = body;
        const openedAt = new Date();
        const status = 'Pendiente';
        const assignedIds = assigned.map((user: User) => user._id);
        const taskForm = {
            branch,
            business,
            assigned: assignedIds,
            taskType,
            openedAt,
            status,
            description,
            participants,
            activity,
            operatorName,
            image,
            workOrderNumber,
            closedAt,
        };
        try {
            const newTask = await TaskModel.create(taskForm);
            if (newTask === undefined)
                return res.json({ statusCode: 500, error: 'could not create Task' });

            return res.json({
                statusCode: 200,
                data: { task: formatIds(newTask), message: 'created Task succesfully' },
            });
        } catch (error) {
            return res.json({ statusCode: 500, error: 'could not create Task' });
        }
    },
    deleteTask: async (req: NextConnectApiRequest, res: NextApiResponse) => {
        const { body } = req;
        await dbConnect();
        const deletedTask = await TaskModel.findById(body._id);
        if (deletedTask == null)
            return res.json({ statusCode: 500, error: 'could not delete Task' });
        await deletedTask.softDelete();
        res.json({ statusCode: 200, data: { message: 'deleted Task succesfully' } });
    },
    getTechTasks: async (req: NextConnectApiRequest, res: NextApiResponse) => {
        await dbConnect();

        const { userId } = req;
        const docUser = await UserModel.findById(userId);
        if (docUser == null)
            return res.json({ statusCode: 500, error: 'User not found' });
        const allTasks = await docUser.getTasks();

        const tasks = formatIds(allTasks);
        const trimmedTasks = tasks.map((task: ITask) => trimTask(task));

        for (let i = 0; i < trimmedTasks.length; i++) {
            const task = trimmedTasks[i];

            const images = task.image;
            console.log(images);

            if (images) {
                for (let j = 0; j < images.length; j++) {
                    const image = images[j];
                    const s3ObjectUrl = image.url;
                    const key = s3ObjectUrl.split('/').pop();

                    const command = new GetObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
                        Key: key,
                    });

                    const url = await getSignedUrl(newS3, command, {
                        expiresIn: 3600, // 1 hour,
                    });

                    images[j].url = url;
                }
            }
        }

        res.json({ statusCode: 200, data: { tasks: trimmedTasks } });
    },
    postTechTask: async (req: NextConnectApiRequest) => {
        const { body } = req;
        await dbConnect();
        console.log(body);
    },
};

export default TaskController;
