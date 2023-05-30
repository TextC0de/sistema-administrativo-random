import type { TaskStatus } from 'backend/models/types'
import TaskStatusBadge from '../TaskStatusBadge'

interface Props {
    status: TaskStatus
    setStatus: (status: TaskStatus) => void
}

const Item = ({ status, setStatus }: Props): JSX.Element => {
    const selectStatus = (): void => {
        setStatus(status)
    }
    return (
        <div onClick={selectStatus} className='p-1 '>
            <TaskStatusBadge status={status} />
        </div>
    )
}

export default Item
