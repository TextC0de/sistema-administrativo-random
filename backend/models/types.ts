export type Frequency = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Month =
    | 'Enero'
    | 'Febrero'
    | 'Marzo'
    | 'Abril'
    | 'Mayo'
    | 'Junio'
    | 'Julio'
    | 'Agosto'
    | 'Septiembre'
    | 'Octubre'
    | 'Noviembre'
    | 'Diciembre';

export enum ExpenseStatus {
    Enviado = 'Enviado',
    Aprobado = 'Aprobado',
}

export type ExpenseType =
    | 'Comida'
    | 'Combustible'
    | 'Hospedaje'
    | 'Insumos'
    | 'Herramienta';

export type PaySource = 'Reintegro' | 'Tarjeta';

export enum TaskStatus {
    SinAsignar = 'Sin asignar',
    Pendiente = 'Pendiente',
    Finalizada = 'Finalizada',
    Aprobada = 'Aprobada',
}

export enum TaskType {
    Preventivo = 'Preventivo',
    Correctivo = 'Correctivo',
    Instalacion = 'Instalacion',
    Desmonte = 'Desmonte',
    Actualizacion = 'Actualizacion',
}

export type Role =
    | 'Tecnico'
    | 'Administrativo Tecnico'
    | 'Administrativo Contable'
    | 'Auditor';

export type PreventiveStatus = 'Pendiente' | 'Al dia';

export const months: Month[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

export const frequencies: Frequency[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const expenseTypes: ExpenseType[] = [
    'Combustible',
    'Comida',
    'Herramienta',
    'Hospedaje',
    'Insumos',
];

export const paySources: PaySource[] = ['Reintegro', 'Tarjeta'];

export const taskStatuses: TaskStatus[] = [
    TaskStatus.SinAsignar,
    TaskStatus.Pendiente,
    TaskStatus.Finalizada,
    TaskStatus.Aprobada,
];

export const taskTypes: TaskType[] = [
    'Preventivo',
    'Correctivo',
    'Actualizacion',
    'Instalacion',
    'Desmonte',
];

export const roles: Role[] = [
    'Tecnico',
    'Administrativo Tecnico',
    'Administrativo Contable',
    'Auditor',
];

export const preventiveStatuses: PreventiveStatus[] = ['Pendiente', 'Al dia'];
