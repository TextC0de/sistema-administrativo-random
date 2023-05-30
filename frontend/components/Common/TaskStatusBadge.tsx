import type { TaskStatus } from 'backend/models/types'
import { Badge } from 'flowbite-react'

interface Props {
    status: TaskStatus
}

const TaskStatusBadge = ({ status }: Props): JSX.Element => {
    const color = (): string => {
        switch (status) {
            case 'Pendiente':
                return 'warning'
            case 'Finalizada':
                return 'success'
            case 'Sin asignar':
                return 'failure'
            case 'Aprobada':
                return 'dark'
        }
    }

    return (
        <Badge color={color()}>{status}</Badge>
    )
}

export default TaskStatusBadge
