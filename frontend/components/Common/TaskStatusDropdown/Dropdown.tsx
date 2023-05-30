import { type TaskStatus, taskStatuses } from 'backend/models/types'
import Item from './Item'
import { Dropdown } from 'flowbite-react'
import TaskStatusBadge from '../TaskStatusBadge'

interface Props {
	setStatus: (status: TaskStatus) => void
	status: TaskStatus
}

const TaskStatusDropdown = ({ setStatus, status }: Props): JSX.Element => {
	return (
		<Dropdown label={<TaskStatusBadge status={status} />} color="black">
			{taskStatuses.map((status: TaskStatus, index: number) => <Dropdown.Item key={index}><Item status={status} setStatus={setStatus}/></Dropdown.Item>)}
		</Dropdown>
	)
}

export default TaskStatusDropdown
